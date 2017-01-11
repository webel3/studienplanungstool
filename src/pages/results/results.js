import Vue from 'vue';
import VueResource from 'vue-resource';
import { ScaleLoader } from 'vue-spinner';

import SemesterHelper from '../../helpers/SemesterHelper';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

Vue.use(VueResource);

/**
 * Vue instance for the results section.
 * @namespace Results
 */
let Results = {

  /**
   * html template for the results section.
   * @property {object}
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
   * Hook that is called when the instance is created.
   * @method {created}
   */
  created: function createdHook() {

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

    formatSemester: function(semester) {
      return SemesterHelper.formatLabel(semester);
    }
  },

  components: { ScaleLoader }
};

export default Results;
