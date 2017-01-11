import Vue from 'vue';

/**
 * NavigationBar is the component that renders the navigation at each page and contains all available links.
 *
 * @module NavigationBar
 * @type {Component}
 */
let NavigationBar = Vue.component('navigation-bar', {

  /**
   * @property {template} template: html for the navigation bar
   */
  template: require('./navigation-bar.html')
});

export default NavigationBar;