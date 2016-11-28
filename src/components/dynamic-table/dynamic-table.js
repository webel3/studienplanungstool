import Vue from 'vue';

let DynamicTable = Vue.component('dynamic-table', {
    props: ['headers', 'rows'],
    template: require('./dynamic-table.html')
});

export default DynamicTable;
