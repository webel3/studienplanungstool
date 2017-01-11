/**
 * Helper that provides functionality to get a day's name by a given day's number
 * and to find out a matching date for a given day.
 *
 * @class
 * @classdesc SemesterHelper is an Object indeed, but it is used like a class.
 */
let DayOfWeek = {

  /**
   * @property {object} days: object that contains seven objects, one for each week day.
   * Each of that objects knows its day's name and its week's day.
   */
  days: [{
    dayOfWeek: 1,
    day: "Montag"
  }, {
    dayOfWeek: 2,
    day: "Dienstag"
  }, {
    dayOfWeek: 3,
    day: "Mittwoch"
  }, {
    dayOfWeek: 4,
    day: "Donnerstag"
  }, {
    dayOfWeek: 5,
    day: "Freitag"
  }, {
    dayOfWeek: 6,
    day: "Samstag"
  }, {
    dayOfWeek: 7,
    day: "Sonntag"
  }],

  /**
   * Get the day object for a given day of week.
   *
   * @param {number} dayOfWeek: day of the week
   * @returns {object} day object that matches the given day of week.
   */
  getDay: function (dayOfWeek) {
    let day = null;
    this.days.forEach(item => {
      if (item.dayOfWeek === dayOfWeek) {
        day = item.day;
      }
    });
    return day;
  },

  /**
   * Get the matching date for a given day of week.
   * This function is used for the timetable view so that days can be assigned to a date.
   *
   * @param {number} dayOfWeek: day of week for which the matching date is required.
   * @param {string} time: string that contains the time, formatted as '15:45:00'.
   * @returns {string} string for the matched date, formatted as '2017-01-31T15:45:00'.
   */
  getDeferenceDay: function(dayOfWeek, time) {
    /*
     * Reference date is 01.01.2017 which was a Sunday.
     * With that reference, we can just add the given 'dayOfWeek' to the 'day'-field of the reference date.
     * For example, Monday is dayOfWeek 1, so 'reference + dayOfWeek' results in the date: 02.01.2017.
     *
     * Format used by fullcalendar.js : '2016-12-09T16:00:00'
     */
    let dow = (dayOfWeek + 1) > 10 ? (dayOfWeek + 1) : ['0', (dayOfWeek + 1)].join('');
    return ['2017-01-', dow, 'T', time].join('');
  }
};

export default DayOfWeek;