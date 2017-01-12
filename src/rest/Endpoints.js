/**
 * Object that stores the REST endpoints that are available on the DreamFactory backend.
 *
 * @class
 * @classdesc Endpoints is an Object indeed, but it is used like a class.
 *
 * @property {string} COURSE:                     endpoint for courses
 * @property {string} COURSE_GROUP:               endpoint for course-groups (A, B, C, D)
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

  COURSE: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/course',
  COURSE_GROUP: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/coursegroup',
  COURSE_EXECUTION: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/courseexecution',
  COURSE_EXECUTION_VIEW: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/courseexecution_view',
  COURSE_DEPENDENCY_VIEW: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/course_dependency_view',
  STUDENT: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/student',
  STUDENT_COURSE_EXECUTION: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/student_courseexecution',
  EXECUTION_SLOT: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/executionslot',
  STUDENT_EXEC_SLOT_VIEW: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/student_courseexecution_slot_view',
  RESULT_VIEW: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/result_view',
  PLANNING: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/plan',
  DEFAULTSTUDYPLAN_COURSE: 'http://ft-engek1.cl.dreamfactory.com/api/v2/studienplanungstool/_table/defaultstudyplan_course'

};

export default Endpoints;
