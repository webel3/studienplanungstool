import Vue from 'vue';
import VueResource from 'vue-resource';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

Vue.use(VueResource);

let Results = {
    template: require('./results.html'),
    data: () => {
        return {
            headers: ["Gruppe", "Code", "Titel", "Typ", "Semester", "Sprache", "Bewertung", "ECTS (erworben)"],
            groups: ["A", "B", "C", "D"],
            modules: []
        }
    },

    created: function createdHook() {
        this.$http.get(Endpoints.RESULT_VIEW, HttpConfig).then((response) => {
            this.modules = response.body.resource;
        }, (response) => {
            window.console.log(response);
        });
    },

    // mounted: function mounted() {
    //     // ensure that DOM element exists prior to use jquery
    //     this.$nextTick(function() {
    //       // some fancy jquery stuff
    //     });
    // },

    methods: {
        filterModules: function(group) {
            return this.modules.filter(m => m.group === group);
        }
    }
};

export default Results;
