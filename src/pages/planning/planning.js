import Vue from 'vue';
import VueResource from 'vue-resource';
import draggable from 'vuedraggable';

import FilterBy from '../../components/filters/filter-by/filter-by';
import FindBy from '../../components/filters/find-by/find-by';

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

  data: function() {
    return {
      currentSemester: 0,
      totalSemesters: 0,
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
      searchString: ""
    }
  },

  created: function() {
    this.$http.get('/src/pages/planning/planning-mock.json').then((response) => {
      this.currentSemester = response.body.currentSemester;
      this.totalSemesters = response.body.totalSemesters;

      response.body.moduleProposals.forEach(m => this.modules.proposals.push(m));
      response.body.moduleCompletions.forEach(m => this.modules.completions.push(m));
      response.body.moduleBookings.forEach(m => this.modules.bookings.push(m));
      response.body.modulePlannings.forEach(m => this.modules.plannings.push(m));
    }, (response) => {
      window.console.log(response);
    });
  },

  mounted: function() {
    let _self = this;

    this.$el.addEventListener('add', function(event) {
      console.log("------------------- 'add' event called.");
      console.log(event);

      let origin = event.from.attributes['data-module-type'].value;
      //let target = event.target.attributes['data-module-type'].value;
      let moduleId = event.item.attributes['data-module-id'].value;
      let semester = parseInt(event.target.attributes['data-semester'].value);

      let itemArray = _self.modules[origin].filter(m => m.id === moduleId);
      itemArray[0].semester = semester;
    });
  },


  computed: {
    cssColumnSize: function() {
      if (this.totalSemesters == 9) {
        return 10;
      }
      return 7;
    },

    proposalConfig: function() {
      return Object.assign({
        group: {
          name: this.types.PROPOSALS,
          put: [this.types.PLANNINGS]
        },
      }, this.baseConfig);
    },

    planningConfig: function() {
      return Object.assign({
        group: {
          name: this.types.PLANNINGS,
          put: [this.types.PLANNINGS, this.types.PROPOSALS]
        }
      }, this.baseConfig);
    },

    filteredProposals: function() {
      return this.modules.proposals.filter(item => {
        if (item.name.toLowerCase().indexOf(this.searchString.trim().toLowerCase()) > -1) {
          return item;
        }
      });
    }

  },

  methods: {
    filterBy: FilterBy,
    findBy: FindBy,
  },

  components: { draggable, FilterBy, FindBy }
};

export default Planning;
