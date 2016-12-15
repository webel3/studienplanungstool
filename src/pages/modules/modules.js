import ExecutionTile from '../../components/execution-tile/execution-tile';

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
            this.executions = response.body.executions;
            this.bookings = response.body.bookingsNext;
            this.bookingsAfterNext = response.body.bookingsAfterNext;
        }, (response) => {
            window.console.log(response);
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
                if (item.title.toLowerCase().indexOf(this.searchString.trim().toLowerCase()) > -1) {
                    return item;
                }
            });
        }
    },

    components: { ExecutionTile }
};

export default Modules;
