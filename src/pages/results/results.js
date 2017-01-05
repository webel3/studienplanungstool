import Vue from 'vue';
import VueResource from 'vue-resource';

import SemesterHelper from '../../helpers/SemesterHelper';
import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

Vue.use(VueResource);

let Results = {
  template: require('./results.html'),
  data: () => {
    return {
      groups: [],
      modules: []
    }
  },

  created: function createdHook() {

    Promise.all([
      this.$http.get(Endpoints.RESULT_VIEW, HttpConfig),
      this.$http.get(Endpoints.COURSE_GROUP, HttpConfig)
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
  }
};

export default Results;
