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

let proposals = [
    {
        id: 'BZG-3001',
        name: 'Lineare Algebra'
    }, {
        id: 'BZG-3002',
        name: 'Diskrete Mathematik'
    }, {
        id: 'BTI-7001',
        name: 'Analysis'
    }, {
        id: 'BTI-7002',
        name: 'Statistik und Wahrscheinlichkeitsrechnung'
    }, {
        id: 'XYZ-8001',
        name: 'Relationale Algebra'
    }, {
        id: 'XYZ-8002',
        name: 'Berechenbarkeit und Komplexität'
    }, {
        id: 'ABC-0001',
        name: 'eins'
    }, {
        id: 'ABC-0002',
        name: 'zwei'
    }, {
        id: 'ABC-0003',
        name: 'drei'
    }, {
        id: 'ABC-0004',
        name: 'vier'
    }, {
        id: 'ABC-0005',
        name: 'fünf'
    }, {
        id: 'ABC-0006',
        name: 'sechs'
    }, {
        id: 'ABC-0007',
        name: 'sieben'
    }, {
        id: 'ABC-0008',
        name: 'acht'
    }, {
        id: 'ABC-0009',
        name: 'neun'
    }, {
        id: 'ABC-0010',
        name: 'zehn'
    }
];


let Planning = {
    template: require('./planning.html'),
    data: function() {
        return {
            nrOfSem: 0,
            semesters: [],
            moduleProposals: proposals,
            baseConfig: {
                group: 'semesterlist',
                handle: '.handle'
            },
            workaround: "ugly workaround to get 'v-show' updating correctly by using a two-way data binding"
        }
    },
    created: function() {
      this.nrOfSem = 9;  // TODO: vom Backend laden.
      for (let i = 0; i < this.nrOfSem; i++) {
        this.semesters[i] = {
          modules: []
        };
      }
    },
    methods: {
        extractSemester: function(elem) {
            return elem.attributes['data-sem-id'].value;
        },
        extractModuleId: function(elem) {
            return elem.attributes['data-module-id'].value
        }
    },
    computed: {
        cssColumnClass: function() {
            return "col-md-" + (this.nrOfSem + 1);
        },

        sortableConfigSemesters: function() {
            let _self = this;

            return Object.assign({
                onAdd: function(event) {
                    let semester = _self.extractSemester(event.to);
                    let moduleId = _self.extractModuleId(event.item);
                    _self.semesters[semester - 1].modules.push(moduleId);
                    _self.workaround = _self.workaround.split('').reverse().join('');
                },
                onRemove: function(event) {
                    let semester = _self.extractSemester(event.to);
                    let moduleId = _self.extractModuleId(event.item);

                    let index = _self.semesters[semester -1].modules.indexOf(moduleId);
                    if (index > -1) {
                        _self.semesters[semester -1].modules.splice(index, 1);
                    }
                    _self.workaround = _self.workaround.split('').reverse().join('');
                }
            }, this.baseConfig);
        }
    }
};

export default Planning;
