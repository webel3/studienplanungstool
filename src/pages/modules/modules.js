import ExecutionTile from '../../components/execution-tile/execution-tile';

import {ScaleLoader} from 'vue-spinner';

import jQuery from 'jquery';
import BootstrapSelect from 'bootstrap-select';

import DayOfWeek from '../../helpers/DayOfWeek';
import SemesterHelper from '../../helpers/SemesterHelper';
import UserHelper from '../../helpers/UserHelper';
import DependencyCheck from '../../helpers/DependencyCheck';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';


/**
 * Component that is responsible for the modules page.
 *
 * @class
 * @classdesc Modules is an Object indeed, but it is used as a class to create a new Vue instance.
 */
let Modules = {

  /**
   * @property {template} template: html for the modules page.
   */
  template: require('./modules.html'),


  /**
   * Function that provides the data of the Vue instance to the view so that it can be used.
   * @returns {object} object with proxied data
   */
  data: function () {
    return {
      ready: false,
      upcomingSemester: UserHelper.getUser().upcomingsemester,
      bookingsModifiable: !UserHelper.getUser().booking_confirmed,
      executions: [],
      bookings: [],
      nspCourses: [],
      searches: {
        nspOnly: 0,
        module: '',
        places: {
          model: [],
          options: [{
            value: 'BER',
            name: 'Bern'
          }, {
            value: 'BIE',
            name: 'Biel'
          }]
        },
        types: {
          model: [],
          options: [{
            value: 'PM',
            name: 'Pflicht'
          }, {
            value: 'WM',
            name: 'Wahlpflicht'
          }, {
            value: 'WW',
            name: 'Wahl'
          }]
        },
        groups: {
          model: [],
          options: [{
            value: 'A',
            name: 'A'
          }, {
            value: 'B',
            name: 'B'
          }, {
            value: 'C',
            name: 'C'
          }, {
            value: 'D',
            name: 'D'
          }, {
            value: 'D1',
            name: 'D1'
          }, {
            value: 'D2',
            name: 'D2'
          }]
        }
      }
    }
  },


  /**
   * Callback function that is called when the component is mounted to the DOM tree.
   * It is used to use the jQuery selectpicker plugin to create the dropdop selection elements.
   */
  mounted: function () {
    this.$nextTick(function () { // ensure that DOM element exists prior to use jquery
      jQuery('.selectpicker').selectpicker();

      /* unfortunately, we have to use that bugfix to get it working.
       * otherwise, the 'open' class won't get toggled and the dropdown is never shown.
       */
      jQuery(".bootstrap-select").click(function () {
        jQuery(this).toggleClass('open');
      });
    });
  },


  /**
   * Callback function that is called after the Vue instance's creation.
   * It is used to load data from the backend, then fill it into the component's view models.
   */
  created: function () {
    let _self = this;
    let queryString = ['?filter=(student_id="', UserHelper.getUser().uid, '")'].join('');
    let queryDspCourse = "?filter=defaultstudyplan_ID=" + UserHelper.getUser().defaultstudyplan_ID;
    Promise.all([
      this.$http.get(Endpoints.COURSE_EXECUTION_VIEW, HttpConfig),
      this.$http.get(Endpoints.EXECUTION_SLOT, HttpConfig),
      this.$http.get(Endpoints.STUDENT_COURSE_EXECUTION + queryString, HttpConfig), // Bookings
      this.$http.get(Endpoints.DEFAULTSTUDYPLAN_COURSE + queryDspCourse, HttpConfig),
      this.$http.get(Endpoints.RESULT_VIEW + queryString, HttpConfig) // results
      // this.$http.get(Endpoints.COURSE_DEPENDENCY_VIEW, HttpConfig) // pre-conditions,
    ]).then(function (responses) {

      let results = responses[4].body.resource;
      // let dependencies = responses[5].body.resource;

      /*
       * Only show executions that are not completed yet.
       */
      responses[0].body.resource.forEach(execution => {
        let randomNr = Math.floor(Math.random() * 100); // number between 0..100
        execution.bookingAllowed = randomNr % 7 !== 0; // workaround as long as DependencyCheck is outcommented.

        let resultList = results.filter(result => {
          if (result.course_id === execution.course_id) {
            return result;
          }
        });
        if (resultList.length === 0) {
          _self.executions.push(execution);
        }
      });

      /*
       * check each execution if the student is allowed to book it.
       *
       * NOTE: we can NOT do that because the DreamFactroy backend is such a crap that
       * it can't even handle more than four requests (but two more would be necessary).
       */
      //DependencyCheck.setBookingsAllowed(_self.executions, dependencies, results);


      _self.executions.forEach(exec => {
        let option = _self.searches.places.options.filter(option => {
          return option.value === exec.place;
        });
        exec.placeLabel = option[0].name;
        exec.semester = SemesterHelper.split(exec.semester);
      });

      // assign time slots to executions
      responses[1].body.resource.forEach(slot => {
        _self.executions.forEach(exec => {
          if (exec.uid === slot.courseexecution_id) {
            if (!exec.slots) {
              exec.slots = [];
            }
            slot.day = DayOfWeek.getDay(slot.dayofweek);
            slot.start = slot.start.substr(0, 5);
            slot.end = slot.end.substr(0, 5);
            exec.slots.push(slot);
          }
        });
      });

      // remove bookings from executions, add them to bookings
      responses[2].body.resource.forEach(booking => {
        _self.executions.forEach(execution => {
          if (execution.uid === booking.courseexecution_ID) {
            _self.bookings.push(execution);
            _self.executions.splice(_self.executions.indexOf(execution), 1);
          }
        });
      });

      let sem = UserHelper.getUser().upcomingsemester;
      responses[3].body.resource.forEach((item) => {
        if (item.semester === sem || item.semester === (sem + 1)) {
          _self.nspCourses.push(item);
        }
      });
      _self.ready = true;
    }, responses => {
      console.log("something went wrong:", responses);
    });

  },


  /**
   * @property {object} computed: computed properties that are calculated once
   * and just get recalculated when one (or more) of the view model properties change
   * on which a computed property depends.
   */
  computed: {
    filteredExecutions: function () {
      return this.executions

      // check if the module name matches the searched input string.
      .filter(item => {
        if (item.course_name_de.toLowerCase().indexOf(this.searches.module.trim().toLowerCase()) > -1) {
          return item;
        }
      })

      // if there is at least one place selected, check for it.
      .filter(item => {
        if (this.searches.places.model.length > 0) {
          if (this.searches.places.model.indexOf(item.place) > -1) {
            return item;
          }
        } else return item;
      })

      // if there is at least one module type selected, check for it.
      .filter(item => {
        if (this.searches.types.model.length > 0) {
          if (this.searches.types.model.indexOf(item.coursetype) > -1) {
            return item;
          }
        } else return item;
      })

      // if there is at least one module group selected, check for it.
      .filter(item => {
        if (this.searches.groups.model.length > 0) {
          if (this.searches.groups.model.indexOf(item.coursegroup) > -1) {
            return item;
          }
        } else return item;
      })

      // only nsp modules
      .filter(item => {
        if (this.searches.nspOnly) {
          let isNsp = 0;
          this.nspCourses.forEach((course) => {
            if (course.course_ID === item.course_id) {
              isNsp = 1;
              return;
            }
          });
          if (isNsp) {
            return item;
          }
        } else {
          return item;
        }
      })
        ;
    },

    filteredBookings: function () {
      let info = SemesterHelper.split(SemesterHelper.NOW_REFERENCE);

      return this.bookings.filter(elem => {
        if (elem.semester.year === info.year && elem.semester.type === info.type) {
          return elem;
        }
      });
    },

    filteredBookingsAfterNext: function () {
      let info = SemesterHelper.add(SemesterHelper.NOW_REFERENCE, 1);

      return this.bookings.filter(elem => {
        if (elem.semester.year === info.year && elem.semester.type === info.type) {
          return elem;
        }
      });
    }
  },


  /**
   * @property {object} methods: object that contains all functions that are accessible from the view.
   */
  methods: {
    createRequestBody: function (execution) {
      return {
        "resource": {
          "student_ID": UserHelper.getUser().uid,
          "courseexecution_ID": execution.uid
        }
      };
    },

    add: function (execution) {
      if (execution.bookingAllowed) {
        this.ready = false;

        this.$http.post(Endpoints.STUDENT_COURSE_EXECUTION, this.createRequestBody(execution), HttpConfig).then((response) => {
          this.executions.splice(this.executions.indexOf(execution), 1);
          this.bookings.push(execution);
          this.ready = true;
        }, (response) => {
          window.console.error(response);
        });
      } else {
        let text = ["Die Auswahl des Moduls '", execution.course_name_de,
            "' ist nicht erlaubt, da nicht alle Vorbedingungen erfüllt sind."].join('');
        window.alert(text);
      }



    },

    remove: function (execution) {
      this.ready = false;
      let options = Object.assign({}, HttpConfig);
      options.body = this.createRequestBody(execution);
      this.$http.delete(Endpoints.STUDENT_COURSE_EXECUTION, options).then((response) => {
        this.bookings.splice(this.bookings.indexOf(execution), 1);
        this.executions.push(execution);
        this.ready = true;
      }, (response) => {
        window.console.error(response);
      });
    },

    confirmBooking: function () {
      let sure = window.confirm('Soll die Moduleinschreibung definitiv abgegeben werden? ' +
        'Danach kann sie nicht mehr verändert werden.');

      if (sure) {
        let user = UserHelper.getUser();
        let endpoint = [Endpoints.STUDENT, '/', user.uid].join('');
        let body = {
          'booking_confirmed': true
        };

        this.$http.patch(endpoint, body, HttpConfig).then((response) => {
          user.booking_confirmed = true;
          UserHelper.setUser(user);
          window.location.reload();
        }, (failure) => {
          window.console.log('confirm bookings went wrong. ', failure);
        });
      }
    },

    formatSemester: function (incremental) {
      let increment = incremental || 0;
      let info = SemesterHelper.add(SemesterHelper.NOW_REFERENCE, increment);
      return [info.type.name, info.year].join(' ');
    }
  },


  /**
   * @property {object} components: object that defines all components that are used inside this Vue component.
   */
  components: {ExecutionTile, jQuery, BootstrapSelect, ScaleLoader}
};

export default Modules;
