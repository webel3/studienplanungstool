import ExecutionTile from '../../components/execution-tile/execution-tile';

import jQuery from 'jquery';
import BootstrapSelect from 'bootstrap-select';

import DayOfWeek from '../../helpers/DayOfWeek';
import SemesterHelper from '../../helpers/SemesterHelper';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

function getUserId() {
  return JSON.parse(sessionStorage.getItem('user')).uid;
}

let Modules = {
  template: require('./modules.html'),

  data: function () {
    return {
      upcomingSemester: JSON.parse(sessionStorage.getItem('user')).upcomingsemester,
      executions: [],
      bookings: [],
      searches: {
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

  created: function () {
    let _self = this;
    let queryString = ['?filter=(student_id="', getUserId(), '")'].join('');

    Promise.all([
      this.$http.get(Endpoints.COURSE_EXECUTION_VIEW, HttpConfig),
      this.$http.get(Endpoints.EXECUTION_SLOT, HttpConfig),
      this.$http.get(Endpoints.STUDENT_COURSE_EXECUTION + queryString, HttpConfig) // Bookings
    ]).then(function (responses) {
      _self.executions = responses[0].body.resource;

      _self.executions.forEach(exec => {
        let option = _self.searches.places.options.filter(option => {
          return option.value === exec.place;
        });
        exec.place = option[0].name;
        exec.semester = SemesterHelper.split(SemesterHelper.NOW_REFERENCE);
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

    }, responses => {
      console.log("something went wrong:", responses);
    });

  },

  methods: {

    createRequestBody: function (execution) {
      return {
        "resource": {
          "student_ID": getUserId(),
          "courseexecution_ID": execution.uid
        }
      };
    },

    add: function (execution) {
      this.$http.post(Endpoints.STUDENT_COURSE_EXECUTION, this.createRequestBody(execution), HttpConfig).then((response) => {
        this.executions.splice(this.executions.indexOf(execution), 1);
        this.bookings.push(execution);
      }, (response) => {
        window.console.error(response);
      });

    },

    remove: function (execution) {
      let options = Object.assign({}, HttpConfig);
      options.body = this.createRequestBody(execution);
      this.$http.delete(Endpoints.STUDENT_COURSE_EXECUTION, options).then((response) => {
        this.bookings.splice(this.bookings.indexOf(execution), 1);
        this.executions.push(execution);
      }, (response) => {
        window.console.error(response);
      });
    },

    formatSemester: function (incremental) {
      let increment = incremental || 0;
      let info = SemesterHelper.add(SemesterHelper.NOW_REFERENCE, increment);
      return [info.type.name, info.year].join(' ');
    }
  },

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
        ;
    },

    filteredBookings: function () {
      let info = SemesterHelper.split(SemesterHelper.NOW_REFERENCE);
      let label = parseInt([info.year, info.type.value].join(''));

      return this.bookings.filter(elem => {
        if (elem.semester.year === info.year && elem.semester.type === info.type) {
          return elem;
        }
      });
    },

    filteredBookingsAfterNext: function () {
      let info = SemesterHelper.add(SemesterHelper.NOW_REFERENCE, 1);
      let label = parseInt([info.year, info.type.value].join(''));

      return this.bookings.filter(elem => {
        if (elem.semester === label) {
          return elem;
        }
      });
    }
  },

  components: {ExecutionTile, jQuery, BootstrapSelect}
};

export default Modules;
