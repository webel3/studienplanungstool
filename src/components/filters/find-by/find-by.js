import Vue from 'vue';

/**
 * Filter that finds a given value (or a property with that value) inside a given list.
 *
 * @type {filter}
 * @returns {list} filtered list that only contains the searched value (or properties with that value).
 */
let FindBy = Vue.filter('findBy', function (list, value, property) {
  return list.filter(item => {
    if (property && item[property]) {
      return item[property] == value;
    }
    return item == value;
  });
});

export default FindBy;