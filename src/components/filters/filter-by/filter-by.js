import Vue from 'vue';

let FilterBy = Vue.filter('filterBy', function (list, value, property) {
    return list.filter(item => {
        if (property && item[property]) {
            return item.property.indexOf(value) > -1;
        }
        return item.indexOf(value) > -1;
    });
});

// let FilterBy = function filterBy(list, value) {
//     return list.filter(function(item) {
//         return item.indexOf(value) > -1;
//     });
// };

export default FilterBy;


