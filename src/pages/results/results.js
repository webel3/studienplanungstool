import DynamicTable from '../../components/dynamic-table/dynamic-table';

import jQuery from 'jquery';



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
            message: 'results.js',
            headers: [],
            rows: []
        }
    },

    created: function createdHook() {
        window.console.log("'created' hook called. jQuery version: ", jQuery.fn.jquery);
        this.headers = headerz;
        this.rows = rowz;
    },

    mounted: function mounted() {

        // ensure that DOM element exists prior to use jquery
        this.$nextTick(function() {
          // some fancy jquery stuff
        });
    },

    components: { DynamicTable }
};

export default Results;
