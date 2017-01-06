let DayOfWeek = {

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

  getDay: function (dayOfWeek) {
    let day = null;
    this.days.forEach(item => {
      if (item.dayOfWeek === dayOfWeek) {
        day = item.day;
      }
    });
    return day;
  },

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