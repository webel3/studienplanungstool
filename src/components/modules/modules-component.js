import Vue from 'vue';
import VueResource from 'vue-resource';

// provide vue-resource's $http service.
Vue.use(VueResource);

let ModulesComponent = {
    template: require('./modules-markup.html'),
    data: () => {
        return {
            message: 'modules-component.js'
        }
    },
    methods: {
        doSthFancy: function () {
            this.$http.get('package.json').then((response) => {
                this.message = response;
            }, (response) => {
                window.console.log(response);
            });
        }
    }
};

export default ModulesComponent;