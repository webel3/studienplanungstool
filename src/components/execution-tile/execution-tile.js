import Vue from 'vue';

/**
 * ExecutionTile is the component that shows a module with all of its information.
 *
 * @module ExecutionTile
 * @type {Component}
 */
let ExecutionTile = Vue.component('execution-tile', {

  /**
   * @property props: properties given into the component.
   *
   * @property {object} props.execution: object that holds all information about an execution
   * @property {cssClass} props.cssClass: string of css class(es) that get appended to the execution tile
   * @property {function} props.addFn: reference to the function that is called when an execution is booked
   * @property {function} props.removeFn: reference to the function that is called when an execution is removed
   * @property {boolean} props.bookable: if that flag is false, the execution can not be booked (or removed)
   */
  props: ['execution', 'cssClass', 'addFn', 'removeFn', 'bookable'],

  /**
   * @property {template} template: html for an execution tile
   */
  template: require('./execution-tile.html')
});

export default ExecutionTile;
