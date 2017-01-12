import jQuery from 'jquery';
import FullCalendar from 'fullcalendar';
import moment from 'moment';

import {ScaleLoader} from 'vue-spinner';

import UserHelper from '../../helpers/UserHelper';
import DayOfweek from '../../helpers/DayOfWeek';
import HttpConfig from '../../rest/HttpConfig';
import Endpoints from '../../rest/Endpoints';


/**
 * Component that is responsible for the timetable page.
 *
 * @class
 * @classdesc Timetable is an Object indeed, but it is used as a class to create a new Vue instance.
 */
let Timetable = {

  /**
   * @property {template} template: html for the timetable page.
   */
  template: require('./timetable.html'),


  /**
   * Function that provides the data of the Vue instance to the view so that it can be used.
   * @returns {object} object with proxied data
   */
  data: () => {
    return {
      events: [],
      ready: false
    }
  },


  /**
   * Callback function that is called when the component is mounted to the DOM tree.
   * It is used to first load the data from the backend and, as the response is available,
   * then use jQuery fullcalendar plugin to create the timetable on the page.
   */
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
        event.url = ['https://www.ti.bfh.ch/fileadmin/modules/', event.coursecode, '-de.xml'].join('');
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
          eventClick: function(event) {
            if (event.url) {
              window.open(event.url, "_blank");
              return false;
            }
          },
          locale: 'de',
          header: {
            center: '',
            right: 'germanAgendaWeek, germanListWeek'
          },
          defaultView: 'agendaWeek',
          defaultDate: moment('2017-01-02'),
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


  /**
   * @property {object} components: object that defines all components that are used inside this Vue component.
   */
  components: {jQuery, FullCalendar, HttpConfig, Endpoints, ScaleLoader}
};

export default Timetable;
