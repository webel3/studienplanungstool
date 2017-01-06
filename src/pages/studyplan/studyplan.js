import UserHelper from '../../helpers/UserHelper';

let StandardStudyPlan = {

  template: require('./studyplan.html'),

  data: () => {
    return {
      totalSemesters: UserHelper.getUser().totalsemester,
      imgName: ['studyplan-semesters-', UserHelper.getUser().totalsemester, '.png'].join('')
    }
  },

  computed: {
    getStudyPlace: function() {
      if (this.totalSemesters === 6) {
        return 'Vollzeitstudium Biel';
      }
      return 'berufsbegleitend Bern';
    }
  }
};

export default StandardStudyPlan;