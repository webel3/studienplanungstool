import jQuery from 'jquery';
import FullCalendar from 'fullcalendar';

import { ScaleLoader } from 'vue-spinner';

import UserHelper from '../../helpers/UserHelper';
import DayOfweek from '../../helpers/DayOfWeek';
import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';

let Timetable = {
  template: require('./timetable.html'),
  data: () => {
    return {
      events: [],
      ready: false
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

      _self.ready = true;
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
  },

  components: { jQuery, FullCalendar, HttpConfig, Endpoints, ScaleLoader }
};

export default Timetable;
