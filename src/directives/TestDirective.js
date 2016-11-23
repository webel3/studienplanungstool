import Vue from 'vue';

/*
 * Create your own component named 'test-component'.
 *
 * origin of the approach to outsource the template using 'require' :
 * https://laracasts.com/discuss/channels/vue/vue-using-templates-from-external-file?page=1
 */
Vue.component('test-directive', {
    props: ['message'],
    template: require('./test-directive.html')
});