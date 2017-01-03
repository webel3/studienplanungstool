import ExecutionTile from '../../components/execution-tile/execution-tile';

import jQuery from 'jquery';
import BootstrapSelect from 'bootstrap-select';

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

    mounted: function() {
        this.$nextTick(function() { // ensure that DOM element exists prior to use jquery
            jQuery('.selectpicker').selectpicker();

            /* unfortunately, we have to use that bugfix to get it working.
             * otherwise, the 'open' class won't get toggled and the dropdown is never shown.
             */
            jQuery(".bootstrap-select").click(function () {
                jQuery(this).toggleClass('open');
            });
        });
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
                        slot.start = slot.start.substr(0, 5);
                        slot.end = slot.end.substr(0, 5);
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

            window.console.log('--------------------------------------------------------------');
            window.console.log('module: ', this.searches.module);
            window.console.log('places:', this.searches.places.model);
            window.console.log('types: ', this.searches.types.model);
            window.console.log('groups: ', this.searches.groups.model);

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

    components: { ExecutionTile, jQuery, BootstrapSelect }
};

export default Modules;
