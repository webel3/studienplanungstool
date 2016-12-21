import jQuery from 'jquery';
import FullCalendar from 'fullcalendar';

import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

let Timetable = {
    template: require('./timetable.html'),
    data: () => {
        return {
            events: []
        }
    },

    created: function() {
        this.$http.get('/src/pages/timetable/timetable-mock.json').then((response) => {
            this.events = response.body.events;

        }, (response) => {
            window.console.log(response);
        });


        this.$http.get(Endpoints.TABLE_COURSE_EXECUTION, HttpConfig).then(response => {
            window.console.log(response.body);
        }, response => {
            window.console.log(response);
        });

    },

    mounted: function () {
        let _self = this;

        // ensure that DOM element exists prior to use jquery
        _self.$nextTick(function() {

            // 'fullCalendar' documentation: https://fullcalendar.io/docs/
            jQuery('#calendar').fullCalendar({
                header: {
                    left: 'prev,next, today',
                    center: 'title',
                    right: 'month, agendaWeek, agendaDay, listWeek'
                },
                locale: 'de',
                columnFormat: 'dddd DD.MM.',
                defaultDate: '2016-12-12',
                navLinks: true,
                editable: false,
                events: [{
                        "title": "All Day Event",
                        "start": "2016-12-01"
                    },
                    {
                        "title": "Long Event",
                        "start": "2016-12-07",
                        "end": "2016-12-10"
                    },
                    {
                        "id": 999,
                        "title": "Repeating Event",
                        "start": "2016-12-09T16:00:00"
                    },
                    {
                        "id": 999,
                        "title": "Repeating Event",
                        "start": "2016-12-16T16:00:00"
                    },
                    {
                        "title": "Conference",
                        "start": "2016-12-11",
                        "end": "2016-12-13"
                    },
                    {
                        "title": "Meeting",
                        "start": "2016-12-12T10:30:00",
                        "end": "2016-12-12T12:30:00"
                    },
                    {
                        "title": "Lunch",
                        "start": "2016-12-12T12:00:00"
                    },
                    {
                        "title": "Meeting",
                        "start": "2016-12-12T14:30:00"
                    },
                    {
                        "title": "Happy Hour",
                        "start": "2016-12-12T17:30:00"
                    },
                    {
                        "title": "Dinner",
                        "start": "2016-12-12T20:00:00"
                    },
                    {
                        "title": "Birthday Party",
                        "start": "2016-12-13T07:00:00"
                    },
                    {
                        "title": "Click for Google",
                        "url": "http://google.com/",
                        "start": "2016-12-28"
                    }]
            });

        });
    },

    components: { jQuery, FullCalendar, HttpConfig, Endpoints }
};

export default Timetable;
