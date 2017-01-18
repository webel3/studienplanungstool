/**
 * Helper to check if executions are allowed to get booked or not.
 *
 * @class
 * @classdesc DependencyCheck is an Object indeed, but it is used like a class.
 */
let DependencyCheck = {

  /**
   * Method checks for each execution if it requires previous executions and,
   * if that is the case, if they are completed or not.
   *
   * @param {list} executionList list of execution objects
   * @param {list} dependencyList list of dependency objects
   * @param {list} resultList list of result objects
   */
  setBookingsAllowed: function(executionList, dependencyList, resultList) {

    /*
     * for each execution, check whether it is allowed to get booked or not.
     */
    executionList.forEach(execution => {
      let isAllowed = true;

      // get all dependencies for that execution.
      let requiredDependencies = dependencyList.filter(dependency => {
        return dependency.course_id === execution.course_id;
      });

      // for each dependency, iterate over its results
      requiredDependencies.forEach(dependency => {

        // filter the results for a dependency (may be more than one in case of repetitions)
        let filteredResults = resultList.filter(result => {
          return result.course_id === dependency.pre_course_id;
        });

        // if no result is found, the execution is not allowed to get booked.
        if (filteredResults.length === 0) {
          isAllowed = false;
        } else {
          // we have one or more results, so check their grades.

          let gradeOk = false;
          let validGrades = ['A', 'B', 'C', 'D', 'E', 'FX'];
          filteredResults.forEach(result => {
            if (validGrades.indexOf(result.grade.toUpperCase()) > 0) {
              gradeOk = true;
            }
          });
          isAllowed = gradeOk;
        }
      });

      execution.bookingAllowed = isAllowed;
    });
  }

};

export default DependencyCheck;