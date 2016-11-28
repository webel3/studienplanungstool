import Vue from 'vue';
import VueResource from 'vue-resource';

/*
 * Tell Vue that we want to use the 'vue-resource' plugin
 * which provides services for making web requests.
 *
 * documentation:
 * https://github.com/pagekit/vue-resource
 */
Vue.use(VueResource);

let Modules = {
    template: require('./modules.html'),
    data: () => {
        return {}
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

export default Modules;
