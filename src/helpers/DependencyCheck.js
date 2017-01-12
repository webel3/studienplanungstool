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
   * @param {list} executionList: of execution objects
   * @param {list} dependencyList: of dependency objects
   * @param {list} resultList: of result objects
   */
  setBookingsAllowed: function(executionList, dependencyList, resultList) {

    executionList.forEach(execution => {
      let isAllowed = true;

      // get all dependencies for that execution.
      let requiredDependencies = dependencyList.filter(dependency => {
        if (dependency.course_id === execution.course_id) {
          return dependency;
        }
      });

      // for each dependency, check the results
      requiredDependencies.forEach(dep => {
        let filteredResults = resultList.filter(result => {
          if (result.course_id === dep.pre_course_id) {
            return result;
          }
        });

        // if no result is found for the dependency, the execution is not allowed to get booked.
        if (filteredResults.length === 0) {
          isAllowed = false;
        }
      });

      execution.bookingAllowed = isAllowed;
    });
  }

};

export default DependencyCheck;