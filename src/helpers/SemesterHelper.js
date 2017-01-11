/**
 * Helper that does the handling between a semester-label (form: '201602') and semester objects.
 *
 * @class
 * @classdesc SemesterHelper is an Object indeed, but it is used like a class.
 */
let SemesterHelper = {

  /**
   * @property {number} NOW_REFERENCE: semester-label of the upcoming semester.
   */
  NOW_REFERENCE: 201602,

  /**
   * @property {object} FS: object with the configuration of a spring semester.
   */
  FS: {
    value: '01',
    name: 'FS'
  },

  /**
   * @property {object} HS: object with configuration of an autumn semester.
   */
  HS: {
    value: '02',
    name: 'HS'
  },

  /**
   * Generate the semester-label for the given semester-info object.
   *
   * @param {object} info: information object for a semester.
   * @returns {number} semester-label.
   */
  label: function(info) {
    info.label = parseInt([info.year, info.type.value].join(''));
    return info;
  },

  /**
   * Generate the semester-info object for the given semester-label.
   *
   * @param {number} semesterLabel: semester-label to get information about.
   * @returns {object} semester-info object for the given semester-label.
   */
  split: function (semesterLabel) {
    let info = {
      year: parseInt(semesterLabel.toString().substr(0, 4)),
      type: semesterLabel.toString().substr(4) === this.FS.value ? this.FS : this.HS
    };
    return this.label(info);
  },

  /**
   * Based on the given semester-label, add the given number of semesters
   * and return the calculated semester (which is in the future) as info-object.
   *
   * @param {number} semesterLabel: semester-label used as starting point.
   * @param {number} nr: number of semesters to go forwards.
   * @returns {object} semester-info object for the calculated future semester.
   */
  add: function (semesterLabel, nr) {
    let info = this.split(semesterLabel);

    for (let i = 1; i <= nr; i++) {
      // only increment semester to autumn in case of spring.
      if (info.type === this.FS) {
        info.type = this.HS;
      } else {
        // semester was in autumn, so increment the year and set semester to spring.
        info.type = this.FS;
        info.year++;
      }
    }
    return this.label(info);
  },


  /**
   * Based on the given semester-label, subtract the given number of semesters
   * and return the calculated semester (which is in the past) as info-object.
   *
   * @param {number} semesterLabel: semester-label used as starting point.
   * @param {number} nr: number of semesters to go backwards.
   * @returns {object} semester-info object for the calculated past semester.
   */
  subtract: function (semesterLabel, nr) {
    let info = this.split(semesterLabel);

    for (let i = nr; i >= 0; i--) {
      // only decrement semester to spring if it was autumn.
      if (info.type === this.HS) {
        info.type = this.FS;
      } else {
        // semester was spring, so go one year back and set semester to autumn.
        info.type = this.HS;
        info.year--;
      }
    }
    return this.label(info);
  },


  /**
   * Formats the given semester-label.
   * This function is assumed to be used for views only.
   *
   * @param {number} semesterLabel: semester-label to format
   * @returns {string} formatted label in the form: 'HS 2016'.
   */
  formatLabel: function(semesterLabel) {
    let info = this.split(semesterLabel);
    return [info.type.name, info.year].join(' ');
  }

};

export default SemesterHelper;