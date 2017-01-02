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

    getDay: function(dayOfWeek) {
        let day = null;
        this.days.forEach(item => {
            if (item.dayOfWeek === dayOfWeek) {
                day = item.day;
            }
        });
        return day;
    }
};

export default DayOfWeek;