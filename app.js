import Vue from 'vue';
import VueResource from 'vue-resource';


/**
 * NOTE: to get that project running, type the following on a command line:
 *     "npm run bundle && npm run server"
 *
 * 'npm run' tells NPM that it should execute a script of the given name.
 * Those two scrips are located in package.json:
 *      'bundle': lets webpack bundle the project (with usage of the given config file)
 *      'server': starts a webpack development server.
 *
 *  after that, call 'localhost:8080' to see the page on webpack-dev-server.
 */


/*
 * Tell Vue that we want to use the 'vue-resource' plugin
 * which provides services for making web requests.
 *
 * documentation:
 * https://github.com/pagekit/vue-resource
 */
Vue.use(VueResource);



/*
 * Create your own component called 'gugus'.
 * This is a test whether we can outsource the template's content or not.
 * (in-line templates are as ugly as medusa's grandmom)
 *
 * THE_FUCK_YEAH_ITS_POSSIBLE ! a whole day over to get that shizzle work...
 *
 * reference for that proposed solution with 'require' :
 * https://laracasts.com/discuss/channels/vue/vue-using-templates-from-external-file?page=1
 */
Vue.component('gugus', {
    props: ['message'],
    //template: '<div>{{ message }}</div>' <=== UGLY AS MY NIGHTMARE LAST NIGHT.
    template: require('./test.html')
});



/*
 * Create a vue instance bound to the tag with id 'app'.
 * If you press the button inside that 'app' block, the shown message gets overwritten after
 * the $http call has read the package.json file.
 */
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        showPackageJson: function () {
            this.$http.get('package.json').then((response) => {
                this.message = response;
            }, (response) => {
                window.console.log(response);
            });
        }
    }
});