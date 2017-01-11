import Vue from 'vue';

/**
 * Filter that checks if a list contains the given value (or a property with that value).
 *
 * @type {filter}
 * @returns {boolean} true if the list contains the value, otherwise false.
 */
let FilterBy = Vue.filter('filterBy', function (list, value, property) {
  return list.filter(item => {
    if (property && item[property]) {
      return item.property.indexOf(value) > -1;
    }
    return item.indexOf(value) > -1;
  });
});

export default FilterBy;


