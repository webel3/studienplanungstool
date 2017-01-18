import draggable from 'vuedraggable';
import {ScaleLoader} from 'vue-spinner';

import SemesterHelper from '../../helpers/SemesterHelper';
import UserHelper from '../../helpers/UserHelper';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';


/**
 * Component that is responsible for the planning page.
 *
 * @class
 * @classdesc Plannings is an Object indeed, but it is used as a class to create a new Vue instance.
 */
let Planning = {

  /**
   * @property {template} template html for the planning page.
   */
  template: require('./planning.html'),


  /**
   * Function that provides the data of the Vue instance to the view so that it can be used.
   * @returns {object} object with proxied data
   */
  data: function () {
    return {
      upcomingSemester: UserHelper.getUser().upcomingsemester,
      totalSemesters: UserHelper.getUser().totalsemester,
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
      colMdSizeCssClass: '',
      ready: false
    }
  },


  /**
   * Callback function that is called after the Vue instance's creation.
   * It is used to load data from the backend, then fill it into the component's view models.
   */
  created: function () {
    let _self = this;

    let queryUser = ['?filter=(student_id="', UserHelper.getUser().uid, '")'].join('');
    let queryUserAndRelated = [queryUser, '&related=courseexecution_by_courseexecution_ID'].join('');

    Promise.all([
      this.$http.get(Endpoints.get(Endpoints.COURSE), HttpConfig), // proposals
      this.$http.get(Endpoints.get(Endpoints.RESULT_VIEW + queryUser), HttpConfig), // completions
      this.$http.get(Endpoints.get(Endpoints.STUDENT_COURSE_EXECUTION + queryUserAndRelated), HttpConfig), // bookings
      this.$http.get(Endpoints.get(Endpoints.PLANNING + queryUser), HttpConfig), // plannings
    ])
    .then(function (responses) {
      /*
       * Proposals come with all necessary information.
       * Remove Wahlpflichtmodule, only Pflicht- und Wahlmodule are allowed to get planned.
       */
      responses[0].body.resource.forEach(prop => {
        if (prop.type === 1 || prop.type === 2) {
          prop.id_of_the_module = prop.uid;
          _self.modules.proposals.push(prop);
        }
      });

      _self.modules.completions = responses[1].body.resource; // comes with all information

      // Remove all completed modules from the proposals.
      _self.modules.completions.forEach(completion => {
        _self.modules.proposals.filter((prop) => {
          return prop.uid === completion.course_id;
        }).forEach((prop) => {
          _self.modules.proposals.splice(_self.modules.proposals.indexOf(prop), 1);
        });
      });

      /* The 'bookings' view only delivers the foreign keys of the concerned modules.
       * with that FK, we can find the real module in the 'proposals' array
       * and move that item to the 'bookings' array.
       */
      responses[2].body.resource.forEach(booking => {
        _self.modules.proposals.filter(proposal => {
          return proposal.uid === booking.courseexecution_by_courseexecution_ID.course_id;
        }).forEach(prop => {
          _self.modules.proposals.splice(_self.modules.proposals.indexOf(prop), 1);
          prop.semester = booking.courseexecution_by_courseexecution_ID.semester;
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
            return true;
          }
        }).forEach(prop => {
          _self.modules.proposals.splice(_self.modules.proposals.indexOf(prop), 1);
          prop.semester = planning.semester; // transfer semester information
          prop.planning_id = planning.uid;
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

      _self.ready = true;
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


  /**
   * Callback function that is called when the component is mounted to the DOM tree.
   * It is used to add an event listener when a module is dragged
   * so that the view model can therefore get updated.
   */
  mounted: function () {
    let _self = this;

    this.$el.addEventListener('add', function (event) {

      let origin = event.from.attributes['data-module-type'].value;
      let target = event.target.attributes['data-module-type'].value;
      let moduleId = parseInt(event.item.attributes['data-module-id'].value);
      let semester = parseInt(event.target.attributes['data-semester'].value);

      // set the new semester label to the moved element.
      let module = _self.modules[origin].filter(item => {
        if (item.id_of_the_module === moduleId) {
          return item;
        }
      })[0];
      module.semester = semester;
      let planningId = module.planning_id;

      let resource = {
        student_ID: UserHelper.getUser().uid,
        semester: module.semester,
        course_ID: moduleId
      };

      /*
       * There are three possibilities that are expected to happen:
       *   1) module newly moved from proposal to planning  --> add that module to the planning table
       *   2) module moved back from planning to proposal   --> remove that module from the planning table
       *   3) moved a module between two planning semesters --> update the record with the new semester
       *
       */
      if (origin === _self.types.PROPOSALS && target === _self.types.PLANNINGS) {
        // case 1)
        _self.$http.post(Endpoints.get(Endpoints.PLANNING), {"resource": resource}, HttpConfig).then((response) => {
          console.log("created planning for module " + moduleId);
          module.planning_id = response.body.resource[0].uid;
        }, (response) => {
          console.error(response);
        })

      } else if (origin === _self.types.PLANNINGS && target === _self.types.PROPOSALS) {
        // case 2)
        _self.$http.delete(Endpoints.get(Endpoints.PLANNING + "/" + planningId), HttpConfig).then((response) => {
          console.log("deleted planning " + planningId);
        }, (response) => {
          console.error(response);
        })

      } else if (origin === target && origin === _self.types.PLANNINGS) {
        // case 3)
        _self.$http.patch(Endpoints.get(Endpoints.PLANNING + "/" + planningId), resource, HttpConfig).then((response) => {
          console.log("patched planning " + planningId);
        }, (response) => {
          console.error(response);
        })
      } else {
        window.console.log("oops, that should never happen...");
      }
    });
  },


  /**
   * @property {object} computed computed properties that are calculated once
   * and just get recalculated when one (or more) of the view model properties change
   * on which a computed property depends.
   */
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

    orderedSemesters: function () {
      return this.semesters.sort(function (sem1, sem2) {
        return sem1.label > sem2.label;
      });
    },

    getUpcomingSemesterLabel: function () {
      return SemesterHelper.NOW_REFERENCE;
    },

    getAfterNextSemesterLabel: function () {
      return SemesterHelper.add(SemesterHelper.NOW_REFERENCE, 1).label;
    },

    filteredProposals: function () {
      return this.modules.proposals.filter(item => {
        if (item.name_de.toLowerCase().indexOf(this.searches.module.trim().toLowerCase()) > -1) {
          return item;
        }
      });
    }
  },


  /**
   * @property {object} methods object that contains all functions that are accessible from the view.
   */
  methods: {
    filterModules: function (target, semester) {
      return this.modules[target].filter(module => {
        if (module.semester === semester.label) {
          return module;
        }
      });
    },

    totalEcts: function () {
      let ects = 0;
      this.modules.completions.forEach(completion => {
        ects += completion.ects;
      });
      this.modules.bookings.forEach(booking => {
        ects += booking.ects;
      });
      this.modules.plannings.forEach(planning => {
        ects += planning.ects;
      });
      return ects;
    },

    calculateEcts: function (semester) {
      let ects = 0;
      this.modules.completions.forEach(completion => {
        if (completion.semester === semester.label) {
          ects += completion.ects;
        }
      });
      this.modules.bookings.forEach(booking => {
        if (booking.semester === semester.label) {
          ects += booking.ects;
        }
      });
      this.modules.plannings.forEach(planning => {
        if (planning.semester === semester.label) {
          ects += planning.ects;
        }
      });
      return ects;
    },

    isWahlmodul: function (item) {
      return item.name_de.toLowerCase().startsWith('wahl');
    }
  },


  /**
   * @property {object} components object that defines all components that are used inside this Vue component.
   */
  components: {draggable, SemesterHelper, ScaleLoader}

};

export default Planning;
