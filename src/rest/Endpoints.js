/**
 * Object that stores the REST endpoints that are available on the DreamFactory backend.
 *
 * @class
 * @classdesc Endpoints is an Object indeed, but it is used like a class.
 *
 * @property {string} COURSE                      endpoint for courses
 * @property {string} COURSE_GROUP                endpoint for course-groups (A, B, C, D)
 * @property {string} COURSE_EXECUTION            endpoint for executions
 * @property {string} COURSE_EXECUTION_VIEW       endpoint for a view that enriches executions with other information
 * @property {string} STUDENT                     endpoint for students
 * @property {string} STUDENT_COURSE_EXECUTION    endpoint for selected executions of students
 * @property {string} EXECUTION_SLOT              endpoint for time slots of execution
 * @property {string} STUDENT_EXEC_SLOT_VIEW      endpoint for a view that enriches time slots of student's executions with other information
 * @property {string} RESULT_VIEW                 endpoint for results of students
 * @property {string} PLANNING                    endpoint for plannings of students
 * @property {string} DEFAULTSTUDYPLAN_COURSE     endpoint for courses for default study plans
 */
let Endpoints = {

  COURSE: 'course',
  COURSE_GROUP: 'coursegroup',
  COURSE_EXECUTION: 'courseexecution',
  COURSE_EXECUTION_VIEW: 'courseexecution_view',
  COURSE_DEPENDENCY_VIEW: 'course_dependency_view',
  STUDENT: 'student',
  STUDENT_COURSE_EXECUTION: 'student_courseexecution',
  EXECUTION_SLOT: 'executionslot',
  STUDENT_EXEC_SLOT_VIEW: 'student_courseexecution_slot_view',
  RESULT_VIEW: 'result_view',
  PLANNING: 'plan',
  DEFAULTSTUDYPLAN_COURSE: 'defaultstudyplan_course',


  /**
   * Get the url for the given endpoint.
   *
   * @param endpoint name of the endpoint to use
   * @returns {string} url for the endpoint.
   */
  get: function(endpoint) {
    let localhost = 'http://localhost';
    let dfUri = 'http://ft-engek1.cl.dreamfactory.com';
    let apiPath = '/api/v2/studienplanungstool/_table/';

    if (sessionStorage.getItem('useLocalhost') && JSON.parse(sessionStorage.getItem('useLocalhost')) === true) {
      return encodeURI([localhost, apiPath, endpoint].join(''));
    }
    return encodeURI([dfUri, apiPath, endpoint].join(''));
  }

};

export default Endpoints;
