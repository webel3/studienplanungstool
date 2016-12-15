import Vue from 'vue';

let ExecutionTile = Vue.component('execution-tile', {
  props: ['execution', 'cssClass', 'addFn', 'removeFn'],
  template: require('./execution-tile.html')
});

export default ExecutionTile;
