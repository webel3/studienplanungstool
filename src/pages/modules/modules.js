import ExecutionTile from '../../components/execution-tile/execution-tile';

import DayOfWeek from '../../helpers/DayOfWeek';
import SemesterHelper from '../../helpers/SemesterHelper';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

let Modules = {
    template: require('./modules.html'),

    data: function() {
        return {
            startingSemester: 201201, // TODO
            upcomingSemester: JSON.parse(sessionStorage.getItem('user')).upcomingsemester,
            executions: [],
            bookings: [],
            searchString: ""
        }
    },

    created: function() {
        let _self = this;

        Promise.all([
            this.$http.get(Endpoints.COURSE_EXECUTION_VIEW, HttpConfig),
            this.$http.get(Endpoints.EXECUTION_SLOT, HttpConfig)
        ]).then(function (responses) {
            _self.executions = responses[0].body.resource;

            // TODO: bookings auch noch laden

            responses[1].body.resource.forEach(slot => {
                _self.executions.forEach(exec => {
                    if (exec.uid === slot.courseexecution_id) {
                        if (!exec.slots) {
                            exec.slots = [];
                        }
                        slot.day = DayOfWeek.getDay(slot.dayofweek);
                        exec.slots.push(slot);
                    }

                    exec.semester = SemesterHelper.add(_self.startingSemester, _self.upcomingSemester);
                });
            });
        }, responses => {
            console.log("something went wrong:", responses);
        });
    },

    methods: {
        add: function(execution) {
            let item = null;
            this.executions.forEach(elem => {
                if (elem.executioncode === execution.executioncode) { // i.e. "BTI7021b"
                    item = elem;
                }
            });

            // TODO: erst machen, wenn der POST Request zum Backend erfolgreich war
            this.executions.splice(this.executions.indexOf(item), 1);
            this.bookings.push(item);
        },

        remove: function(execution) {
            // TODO: zuerst POST Request, erst danach die model changes

            let item = this.bookings.splice(this.bookings.indexOf(execution), 1);
            this.executions.push(item[0]);
        },

        formatSemester: function(incremental) {
            let increment = this.upcomingSemester;
            if (incremental > 0) {
                increment += incremental;
            }
            let info = SemesterHelper.add(this.startingSemester, increment);
            return [info.type.name, info.year].join(' ');
        }
    },

    computed: {
        filteredExecutions: function() {
            return this.executions.filter(item => {
                if (item.course_name_de.toLowerCase().indexOf(this.searchString.trim().toLowerCase()) > -1) {
                    return item;
                }
            });
        },

        filteredBookings: function() {
            let info = SemesterHelper.add(this.startingSemester, this.upcomingSemester);
            let label = parseInt([info.year, info.type.value].join(''));

            return this.bookings.filter(elem => {
                if (elem.semester.year === info.year && elem.semester.type === info.type) {
                    return elem;
                }
            });
        },

        filteredBookingsAfterNext: function() {
            let info = SemesterHelper.add(this.startingSemester, this.upcomingSemester + 1);
            let label = parseInt([info.year, info.type.value].join(''));

            return this.bookings.filter(elem => {
                if (elem.semester === label) {
                    return elem;
                }
            });
        }
    },

    components: { ExecutionTile }
};

export default Modules;
