import {ScaleLoader} from 'vue-spinner';

import SemesterHelper from '../../helpers/SemesterHelper';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';


/**
 * Component that is responsible for the results page.
 *
 * @class
 * @classdesc Results is an Object indeed, but it is used as a class to create a new Vue instance.
 */
let Results = {

  /**
   * @property {template} template: html for the results page.
   */
  template: require('./results.html'),


  /**
   * Function that provides the data of the vue instance to the view so that it can be used.
   * @returns {object} object with proxied data
   */
  data: () => {
    return {
      ready: false,
      groups: [],
      modules: []
    }
  },


  /**
   * Callback function that is called after the Vue instance's creation.
   * It is used to load data from the backend, then fill it into the component's view models.
   */
  created: function () {

    Promise.all([
      this.$http.get(new HttpConfig(Endpoints.RESULT_VIEW)),
      this.$http.get(new HttpConfig(Endpoints.COURSE_GROUP))
    ]).then(responses => {
      this.modules = responses[0].body.resource;

      responses[1].body.resource.forEach(group => {
        // do not use group 'D' for results, but 'D1' and 'D2' instead.
        if (group.shortName !== 'D') {

          // add some additional data to each group
          let ects = 0;
          this.modules.filter(m => m.group === group.shortName).forEach(m => ects += m.ects);
          group.summarizedEcts = ects;
          group.usableEcts = group.summarizedEcts < group.maxECTS ? group.summarizedEcts : group.maxECTS;
          group.sufficientEcts = group.usableEcts > group.minECTS;

          this.groups.push(group);
        }
      });
      this.ready = true;
    }, (failures) => {
      window.console.log(failures);
    });
  },


  /**
   * @property {object} methods: object that contains all functions that are accessible from the view.
   */
  methods: {
    filterModules: function (group) {
      return this.modules.filter(m => m.group === group.shortName);
    },

    getTotalEcts: function () {
      let ects = 0;
      this.groups.forEach(group => {
        ects += group.usableEcts;
      });
      return ects;
    },

    formatSemester: function (semester) {
      return SemesterHelper.formatLabel(semester);
    }
  },


  /**
   * @property {object} components: object that defines all components that are used inside this Vue component.
   */
  components: {ScaleLoader}
};

export default Results;
