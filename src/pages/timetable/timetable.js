import jQuery from 'jquery';
import FullCalendar from 'fullcalendar';

import UserHelper from '../../helpers/UserHelper';
import DayOfweek from '../../helpers/DayOfWeek';
import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

let Timetable = {
  template: require('./timetable.html'),
  data: () => {
    return {
      events: []
    }
  },

  mounted: function () {
    let _self = this;
    let userFilterQuery = ['?filter=(student_id="', UserHelper.getUser().uid, '")'].join('');

    this.$http.get(Endpoints.STUDENT_EXEC_SLOT_VIEW + userFilterQuery, HttpConfig).then((response) => {

      /*
       * Process the loaded data and prepare it being usable for fullcalendar.io.
       */
      response.body.resource.forEach(slot => {
        let event = Object.assign({}, slot);
        event.start = DayOfweek.getDeferenceDay(slot.dayofweek, slot.start);
        event.end = DayOfweek.getDeferenceDay(slot.dayofweek, slot.end);
        event.title = slot.course_name_de;
        _self.events.push(event);
      });

      /*
       * After that the data is provided, do the jQuery stuff to get fullcalendar.io working.
       * Ensure that the DOM element exists prior to use jQuery.
       */
        _self.$nextTick(function () {
          jQuery('#calendar').fullCalendar({
            events: _self.events,
            locale: 'de',
            header: {
              center: '',
              right: 'germanAgendaWeek, germanListWeek'
            },
            defaultView: 'agendaWeek',
            columnFormat: 'dddd',
            slotLabelFormat: 'HH:mm',
            timeFormat: 'HH:mm',
            slotDuration: '00:15:00',
            minTime: '07:00:00',
            maxTime: '22:00:00',
            allDaySlot: false,
            listDayAltFormat: false,
            views: {
              germanAgendaWeek: {
                type: 'agendaWeek',
                buttonText: 'Woche'
              },
              germanListWeek: {
                type: 'listWeek',
                buttonText: 'Liste'
              }
            }
          });
        });

    }, (failure) => {
      window.console.log('could not load timetable data.', failure);
    });



    // // ensure that DOM element exists prior to use jquery
    // _self.$nextTick(function () {
    //
    //   // 'fullCalendar' documentation: https://fullcalendar.io/docs/
    //   jQuery('#calendar').fullCalendar({
    //     header: {
    //       left: 'prev,next, today',
    //       center: 'title',
    //       right: 'month, agendaWeek, agendaDay, listWeek'
    //     },
    //     locale: 'de',
    //     columnFormat: 'dddd DD.MM.',
    //     defaultDate: '2016-12-12',
    //     navLinks: true,
    //     editable: false,
    //     events: [{
    //       "title": "All Day Event",
    //       "start": "2016-12-01"
    //     },
    //       {
    //         "title": "Long Event",
    //         "start": "2016-12-07",
    //         "end": "2016-12-10"
    //       },
    //       {
    //         "id": 999,
    //         "title": "Repeating Event",
    //         "start": "2016-12-09T16:00:00"
    //       },
    //       {
    //         "id": 999,
    //         "title": "Repeating Event",
    //         "start": "2016-12-16T16:00:00"
    //       },
    //       {
    //         "title": "Conference",
    //         "start": "2016-12-11",
    //         "end": "2016-12-13"
    //       },
    //       {
    //         "title": "Meeting",
    //         "start": "2016-12-12T10:30:00",
    //         "end": "2016-12-12T12:30:00"
    //       },
    //       {
    //         "title": "Lunch",
    //         "start": "2016-12-12T12:00:00"
    //       },
    //       {
    //         "title": "Meeting",
    //         "start": "2016-12-12T14:30:00"
    //       },
    //       {
    //         "title": "Happy Hour",
    //         "start": "2016-12-12T17:30:00"
    //       },
    //       {
    //         "title": "Dinner",
    //         "start": "2016-12-12T20:00:00"
    //       },
    //       {
    //         "title": "Birthday Party",
    //         "start": "2016-12-13T07:00:00"
    //       },
    //       {
    //         "title": "Click for Google",
    //         "url": "http://google.com/",
    //         "start": "2016-12-28"
    //       }]
    //   });
    //
    // });
  },

  components: {jQuery, FullCalendar, HttpConfig, Endpoints}
};

export default Timetable;
