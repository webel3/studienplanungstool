import Vue from 'vue';
import VueResource from 'vue-resource';
import draggable from 'vuedraggable';

import FilterBy from '../../components/filters/filter-by/filter-by';
import FindBy from '../../components/filters/find-by/find-by';
import SemesterHelper from '../../helpers/SemesterHelper';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

/*
 * Tell Vue that we want to use some plugins:
 *   - 'vue-resource' provides http services
 *
 * documentations:
 *   - https://github.com/pagekit/vue-resource    <-- doesn't update view-model
 *   - http://sagalbot.github.io/vue-sortable     <-- updates view-model correctly.
 */
Vue.use(VueResource);

/*
 * ------------ BE AWARE ------------
 *   Actually, vue-sortable does not work yet with vue 2.0 [29.11.2016].
 *   For that reason, I had to patch the node-module manually corresponding to that suggestion:
 *
 *      https://github.com/sagalbot/vue-sortable/pull/13/files
 *
 *  This means that if you run "npm install", you have to add that workaround until it gets
 *  merged into the official vue-sortable repository (and published via version update).
 *
 *
 *
 *  ------------ BE AWARE 2 ----------
 *  Vue-Sortable did nothing than problems when trying to synchronize the view-model with the displayed data.
 *  For that, we now use 'draggable', a Vue 2.0 - compliant addon that exactly solves the problem of the
 *  synchronisation between view changes due to drag-and-drop functionality and view-model data.
 *
 *      https://github.com/SortableJS/Vue.Draggable
 *
 *  The options for that framework are the same than for the Sortable.js framework and can be found under:
 *
 *      https://github.com/RubaXa/Sortable#options
 *
 *  This means that the patch mentioned above is not further necessary. Anyway, I'll delete that hint
 *  after finishing the 'planning' page to not loosing some maybe-relevant information.
 *
 *
 *  How to deal with Vue event bus:
 *      https://www.sitepoint.com/up-and-running-vue-js-2-0/
 */

let Planning = {
  template: require('./planning.html'),

  data: function () {
    return {
      upcomingSemester: JSON.parse(sessionStorage.getItem('user')).upcomingsemester,
      totalSemesters: JSON.parse(sessionStorage.getItem('user')).totalsemester,
      semesters: [],
      modules: {
        proposals: [],
        completions: [],
        bookings: [],
        plannings: []
      },
      baseConfig: {
        handle: '.dnd-handler',
        draggable: '.list-group-item',
        animation: 150
      },
      types: {
        PROPOSALS: 'proposals',
        COMPLETIONS: 'completions',
        BOOKINGS: 'bookings',
        PLANNINGS: 'plannings'
      },
      searches: {
        module: ''
      },
      colMdSizeCssClass: ''
    }
  },

  created: function () {
    let _self = this;

    let queryString = ['?filter=(student_id="', JSON.parse(sessionStorage.getItem('user')).uid, '")'].join('');
    Promise.all([
      this.$http.get(Endpoints.COURSE, HttpConfig), // proposals
      this.$http.get(Endpoints.RESULT_VIEW + queryString, HttpConfig), // completions
      this.$http.get(Endpoints.STUDENT_COURSE_EXECUTION + queryString, HttpConfig), // bookings
      this.$http.get(Endpoints.PLANNING + queryString, HttpConfig), // plannings
    ])
    .then(function (responses) {
      _self.modules.proposals = responses[0].body.resource; // comes with all information
      _self.modules.completions = responses[1].body.resource; // comes with all information

      // Remove all completed modules from the proposals.
      _self.modules.completions.forEach(completion => {
        _self.modules.proposals.splice(_self.modules.proposals.indexOf(completion), 1);
      });

      /* The 'bookings' view only delivers the foreign keys of the concerned modules.
       * with that FK, we can find the real module in the 'proposals' array
       * and move that item to the 'bookings' array.
       */
      responses[2].body.resource.forEach(booking => { // TODO: Bookings sind Executions, keine Modules !!
        _self.modules.proposals.filter(proposal => {
          return proposal.uid === booking.courseexecution_ID;
        }).forEach(prop => {
          _self.modules.proposals.splice(_self.modules.proposals.indexOf(prop), 1);
          _self.modules.bookings.push(prop);
        });
      });

      /* The 'plannings' view only delivers the foreign keys of the concerned modules.
       * with that fk, we can find the real module in the 'proposals' array
       * and move that item to the 'plannings' array.
       */
      responses[3].body.resource.forEach(planning => {
        _self.modules.proposals.filter(proposal => {
          if (proposal.uid === planning.course_ID) {
            proposal.semester = planning.semester; // transfer semester information
            return true;
          }
        }).forEach(prop => {
          _self.modules.proposals.splice(_self.modules.proposals.indexOf(prop), 1);
          _self.modules.plannings.push(prop);
        });
      });

      /*
       * calculate the initial starting semester, then calculate each upcoming semester
       * (from then up to the end) and add them to the semesters arrray which builds the time lapse.
       */
      let initialSemester = SemesterHelper.subtract(SemesterHelper.NOW_REFERENCE, (_self.upcomingSemester - 1));
      for (let i = 1; i <= _self.totalSemesters; i++) {
        let sem = SemesterHelper.add(initialSemester.label, i);
        _self.semesters.push(sem);
      }

    }, (response) => {
      window.console.log(response);
    });


    /*
     * That's a bit ugly, but we have to calculate the number of required columns.
     * The reason is that bootstrap does not provide 'col-md-*' definitions for each number between 1 and 12 so
     * we had to define our 'special classes' ourselves.
     */
    this.colMdSizeCssClass = ['col-md', (this.totalSemesters + 1)].join('-');
  },

  mounted: function () {
    let _self = this;

    this.$el.addEventListener('add', function (event) {
      console.log("------------------- 'add' event called.");
      console.log(event);

      let origin = event.from.attributes['data-module-type'].value;
      let target = event.target.attributes['data-module-type'].value;
      let moduleId = event.item.attributes['data-module-id'].value;
      let semester = parseInt(event.target.attributes['data-semester'].value);
      // let itemArray = _self.modules[origin].filter(m => m.id === moduleId);
      // itemArray[0].semester = semester;

      /*
       * TODO:
       *    proposals => planning  : PUT to Endpoints.PLANNING
       *    planning  => proposals : DELETE from Endpoints.PLANNING
       *    planning  => planning  : PATCH on Endpoints.PLANNING
       */
    });
  },


  computed: {
    proposalConfig: function () {
      return Object.assign({
        // Only allow that proposals are put to plan semesters.
        group: {
          name: this.types.PROPOSALS,
          put: [this.types.PLANNINGS]
        },
      }, this.baseConfig);
    },

    planningConfig: function () {
      return Object.assign({
        // Planned modules can be put either to another plan semester or back to proposals.
        group: {
          name: this.types.PLANNINGS,
          put: [this.types.PLANNINGS, this.types.PROPOSALS]
        }
      }, this.baseConfig);
    },

    orderedSemesters: function() {
      return this.semesters.sort(function(sem1, sem2) {
        return sem1.label > sem2.label;
      });
    },

    getUpcomingSemesterLabel: function() {
      return SemesterHelper.NOW_REFERENCE;
    },

    getAfterNextSemesterLabel: function() {
      return SemesterHelper.add(SemesterHelper.NOW_REFERENCE, 1);
    },

    filteredProposals: function () {
      return this.modules.proposals.filter(item => {
        if (item.name_de.toLowerCase().indexOf(this.searches.module.trim().toLowerCase()) > -1) {
          return item;
        }
      });
    }
  },

  methods: {
    filterBy: FilterBy,
    findBy: FindBy,

    filterModules: function(target, semester) {
      return this.modules[target].filter(module => {
        if (module.semester === semester.label) {
          return module;
        }
      });
    }
  },

  components: {draggable, FilterBy, FindBy, SemesterHelper}
};

export default Planning;
