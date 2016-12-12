import Vue from 'vue';

let FindBy = Vue.filter('findBy', function (list, value, property) {
    return list.filter(item => {
        if (property && item[property]) {
            return item[property] == value;
        }
        return item == value;
    });
});

// let FindBy = function findBy(list, value) {
//     return list.filter(function(item) {
//         return item == value
//     });
// };

export default FindBy;