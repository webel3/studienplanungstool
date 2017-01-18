import UserHelper from '../../helpers/UserHelper';


/**
 * Component that is responsible for the studyplan page.
 *
 * @class
 * @classdesc StandardStudyPlan is an Object indeed, but it is used as a class to create a new Vue instance.
 */
let StandardStudyPlan = {

  /**
   * @property {template} template html for the studyplan page.
   */
  template: require('./studyplan.html'),


  /**
   * Function that provides the data of the Vue instance to the view so that it can be used.
   * @returns {object} object with proxied data
   */
  data: () => {
    return {
      totalSemesters: UserHelper.getUser().totalsemester,
      imgUrl: ['/src/images/', 'studyplan-semesters-', UserHelper.getUser().totalsemester, '.png'].join('')
    }
  },


  /**
   * @property {object} computed computed properties that are calculated once
   * and just get recalculated when one (or more) of the view model properties change
   * on which a computed property depends.
   */
  computed: {
    getStudyPlace: function () {
      if (this.totalSemesters === 6) {
        return 'Vollzeitstudium Biel';
      }
      return 'berufsbegleitend Bern';
    }
  }
};

export default StandardStudyPlan;