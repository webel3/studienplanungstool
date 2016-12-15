import Vue from 'vue';
import VueResource from 'vue-resource';
import DynamicTable from '../../components/dynamic-table/dynamic-table';

Vue.use(VueResource);


let headerz = ['Code', 'Titel', 'Typ', 'Semester', 'Sprache', 'Bewertung', 'ECTS (erworben)', 'ECTS (anrechenbar)'];
let rowz = [
    ['BZG1151', 'Diskrete Mathematik', 'P', 'HS 2012', 'de', 'B', 6, 6],
    ['BZG1154', 'Wahrscheinlichkeitsrechnung und Statistik', 'P', 'FS 2015', 'de', 'D', 4, 4],
    ['BTI7055', 'Konzepte und Methoden der Programmierung', 'P', 'FS 2013', 'de', 'C', 6, 6],
    ['BTI7061', 'Grundlagen der Informatik', 'P', 'HS 2012', 'de', 'B', 6, 6],
    ['BTI7063', 'Betriebssysteme', 'P', 'FS 2015', 'de', 'C', 4, 4],
];




let Results = {
    template: require('./results.html'),
    data: () => {
        return {
            headers: [],
            groups: [],
            modules: []
        }
    },

    created: function createdHook() {
        this.$http.get('/src/pages/results/results-mock.json').then((response) => {
            this.headers = response.body.headers;
            this.groups = response.body.groups;
            this.modules = response.body.modules;
        }, (response) => {
            window.console.log(response);
        });

        this.headers = headerz;
        this.rows = rowz;
    },

    mounted: function mounted() {
        // ensure that DOM element exists prior to use jquery
        this.$nextTick(function() {
          // some fancy jquery stuff
        });
    },

    methods: {
        filterModules: function(group) {
            return this.modules.filter(m => m.group === group);
        }
    },

    components: { DynamicTable }
};

export default Results;
