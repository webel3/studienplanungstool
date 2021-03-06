import Endpoints from '../../rest/Endpoints';
import HttpConfig from '../../rest/HttpConfig';

/**
 * Component that is responsible for the login page.
 *
 * @class
 * @classdesc Login is an Object indeed, but it is used as a class to create a new Vue instance.
 */
let Login = {

  /**
   * @property {template} template html for the login page.
   */
  template: require('./login.html'),


  /**
   * Function that provides the data of the Vue instance to the view so that it can be used.
   * @returns {object} object with proxied data
   */
  data: function ()  {
    return {
      abbreviation: '',
      password: '',
      loginFailed: false
    }
  },


  /**
   * Callback function that is called after the Vue instance's creation.
   * It is used to check if the 'logout' param is set to destruct the user's session.
   */
  created: function () {
    if (window.location.hash.indexOf('logout') > -1) {
      sessionStorage.clear();
    }
  },


  /**
   * @property {object} computed computed properties that are calculated once
   * and just get recalculated when one (or more) of the view model properties change
   * on which a computed property depends.
   */
  computed: {
    isEnabled: function () {
      // the bfh credential is composed of the first 4 letters of the lastname,
      // the first letter of the firstname and a number.
      return this.abbreviation.length > 4 && this.password !== '';
    }
  },


  /**
   * @property {object} methods object that contains all functions that are accessible from the view.
   */
  methods: {
    login: function (event) {
      event.preventDefault();

      let queryString = '?filter=(abbreviation="' + this.abbreviation + '") AND (password="' + this.password + '")';
      this.$http.get(Endpoints.get(Endpoints.STUDENT + queryString), HttpConfig).then((response) => {
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
  }

};

export default Login;