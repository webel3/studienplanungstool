import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Endpoints from '../../rest/Endpoints';
import HttpConfig from '../../rest/HttpConfig';

Vue.use(VueRouter);
Vue.use(VueResource);

let Login = {

    template: require('./login.html'),
    data: () => {
        return {
            abbreviation: '',
            password: '',
            loginFailed: false
        }
    },

    methods: {
        login: function(event) {
            event.preventDefault();

            let queryString = '?filter=(abbreviation="' + this.abbreviation + '") AND (password="' + this.password + '")';
            this.$http.get(encodeURI(Endpoints.STUDENT + queryString), HttpConfig).then((response) => {
                if (response.body.resource.length === 1) {
                    sessionStorage.setItem('user', JSON.stringify(response.body.resource[0]));
                    location.href = '/';
                } else {
                    this.loginFailed = true;
                }
            }, (response) => {
                window.console.log(response);
            });
        }
    },

    computed: {
        isEnabled: function() {
            // the bfh credential is composed of the first 4 letters of the lastname,
            // the first letter of the firstname and a number.
            return this.abbreviation.length > 4 && this.password !== '';
        }
    }
};

export default Login;