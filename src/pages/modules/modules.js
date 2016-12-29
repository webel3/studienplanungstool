import ExecutionTile from '../../components/execution-tile/execution-tile';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';


var setDay = function (slot) {
    switch (slot.dayofweek) {
        case 1:
            slot.day = "Montag";
            break;
        case 2:
            slot.day = "Dienstag";
            break;
        case 3:
            slot.day = "Mittwoch";
            break;
        case 4:
            slot.day = "Donnerstag";
            break;
        case 5:
            slot.day = "Freitag";
            break;
        case 6:
            slot.day = "Samstag";
            break;
        case 7:
            slot.day = "Sonntag";
            break;
    }
    return slot;
}

let Modules = {
    template: require('./modules.html'),

    data: function() {
        return {
            nextSemester: null,
            executions: [],
            bookings: [],
            bookingsAfterNext: [],
            searchString: ""
        }
    },

    created: function() {
        this.$http.get('/src/pages/modules/modules-mock.json').then((response) => {
            this.nextSemester = response.body.nextSemester;
            //this.executions = response.body.executions;
            this.bookings = response.body.bookingsNext;
            this.bookingsAfterNext = response.body.bookingsAfterNext;
        }, (response) => {
            //window.console.log(response);
        });


        let _self = this;
        let startDate = new Date();

        Promise.all([
            this.$http.get(Endpoints.COURSE_EXECUTION_VIEW, HttpConfig),
            this.$http.get(Endpoints.EXECUTION_SLOT, HttpConfig)
        ]).then(function (responses) {
            _self.executions = responses[0].body.resource;

            let time2 = new Date();
            console.log("call duration: ", (time2 - startDate));
            responses[1].body.resource.forEach(slot => {
                _self.executions.forEach(exec => {
                    if (exec.uid === slot.courseexecution_id) {
                        if (!exec.slots) {
                            exec.slots = [];
                        }
                        exec.slots.push(setDay(slot));
                    }
                });
            });

            console.log("aggregation duration:", (new Date() - time2));

        }, responses => {
            console.log(responses[0]);
            console.log(responses[1]);
        });
    },

    methods: {
        add: function(execution) {
            let item = null;
            this.executions.forEach(elem => {
                if (elem.code === execution.code && elem.identifier === execution.identifier) {
                    item = elem;
                }
            });
            this.executions.splice(this.executions.indexOf(item), 1);

            let target = item.semester === this.nextSemester ? this.bookings : this.bookingsAfterNext;
            target.push(item);
        },

        remove: function(execution) {
            let source = execution.semester === this.nextSemester ? this.bookings : this.bookingsAfterNext;
            let item = source.splice(source.indexOf(execution), 1);
            this.executions.push(item[0]);
        }
    },

    computed: {
        filteredExecutions: function() {
            return this.executions.filter(item => {
                if (item.course_name_de.toLowerCase().indexOf(this.searchString.trim().toLowerCase()) > -1) {
                    return item;
                }
            });
        }
    },

    components: { ExecutionTile }
};

export default Modules;
