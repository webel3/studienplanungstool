import Vue from 'vue';
import VueResource from 'vue-resource';
import VueSortable from 'vue-sortable';

/*
 * Tell Vue that we want to use some plugins:
 *   - 'vue-resource' provides http services
 *   - 'vue-sortable' provides drag-and-drop functionality
 *
 * documentations:
 *   - https://github.com/pagekit/vue-resource
 *   - http://sagalbot.github.io/vue-sortable/
 */
Vue.use(VueResource);
Vue.use(VueSortable);

/*
 * ------------ BE AWARE ------------
 *   Actually, vue-sortable does not work yet with vue 2.0 [29.11.2016].
 *   For that reason, I had to patch the node-module manually corresponding to that suggestion:
 *
 *      https://github.com/sagalbot/vue-sortable/pull/13/files
 *
 *  This means that if you run "npm install", you have to add that workaround until it gets
 *  merged into the official vue-sortable repository (and published via version update).
 */

let Planning = {
    template: require('./planning.html'),
    data: function() {
        return {
            currentSemester: 0,
            totalSemesters: 0,
            modules: {
              completions: [],
              bookings: [],
              plannings: [],
              proposals: []
            },
            baseConfig: {
                group: 'semesterlist',
                handle: '.handle'
            },
            types: {
                PROPOSALS: "proposals",
                PLANNINGS: "plannings"
            }
        }
    },
    created: function() {
      this.$http.get('/src/pages/planning/planning-mock.json').then((response) => {
          this.currentSemester = response.body.currentSemester;
          this.totalSemesters = response.body.totalSemesters;

          response.body.moduleCompletions.forEach(m => this.modules.completions.push(m));
          response.body.moduleBookings.forEach(m => this.modules.bookings.push(m));
          response.body.modulePlannings.forEach(m => this.modules.plannings.push(m));
          response.body.moduleProposals.forEach(m => this.modules.proposals.push(m));

          window.console.log("**** Initial Planning State:");
          this.modules.plannings.forEach(m => window.console.log("" + m.id));
      }, (response) => {
          window.console.log(response);
      });
    },
    methods: {
        inspectTransaction: function(event) {
          let info = {
              moduleId: event.item.attributes['data-module-id'].value,
              origin: {
                  type: event.from.attributes['data-type'].value,
                  semester: event.from.attributes['data-semester'] ? event.from.attributes['data-semester'].value : null
              },
              target: {
                  type: event.item.parentElement.attributes['data-type'].value,
                  semester: event.item.parentElement.attributes['data-semester'] ?
                      event.item.parentElement.attributes['data-semester'].value : null
              }
          };
          return info;
        },

        getConfig: function () {
            let _self = this;

            // mal hier schauen: https://github.com/RubaXa/Sortable/issues/546

            return Object.assign({
                onAdd: function(event) {
                    let info = _self.inspectTransaction(event);
                    let item = _self.modules[info.origin.type].filter(m => m.id === info.moduleId)[0];

                    window.console.log("... adding item with id: " + item.id + " to: " + info.target.type);
                    window.console.log("Updated target State: ");

                    // let modules = [];
                    // for (let i = 0; i < _self.modules[info.target.type].length; i++) {
                    //     modules[i] = _self.modules[info.target.type][i];
                    // }
                    // modules[_self.modules[info.target.type].length] = item;
                    //
                    // _self.modules[info.target.type] = modules;

                    _self.modules[info.target.type].push(item);

                    _self.modules[info.target.type].forEach(m => {
                        window.console.log("" + m.id);
                    });
                },
                onRemove: function(event) {
                    let info = _self.inspectTransaction(event);
                    let item = _self.modules[info.origin.type].filter(m => m.id === info.moduleId)[0];

                    window.console.log("... removing item with id: " + item.id + " from: " + info.origin.type);
                    window.console.log("Updated origin State: ");

                    // let modules = [];
                    // for (let i = 0; i < _self.modules[info.origin.type].length; i++) {
                    //     if (_self.modules[info.origin.type][i].id !== item.id) {
                    //         modules[i] = _self.modules[info.origin.type][i];
                    //     }
                    // }
                    // _self.modules[info.origin.type] = modules;

                    let index = _self.modules[info.origin.type].indexOf(item);
                    if (index > -1) {
                        _self.modules[info.origin.type].splice(index, 1);
                    }

                    _self.modules[info.origin.type].forEach(m => {
                        window.console.log("" + m.id);
                    });
                }
            }, this.baseConfig);
        },

        filterBySemester: function(property, semNr) {
            return this.modules[property].filter(item => {
                return item.semester === semNr;
            });
        }
    },
    computed: {
        cssColumnSize: function() {
            if (this.totalSemesters == 9) {
                return 10;
            }
            return 7;
        }
    }
};

export default Planning;
