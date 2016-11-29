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
        id: 'BZG-0001',
        name: 'Lineare Algebra'
    }, {
        id: 'BZG-0002',
        name: 'Diskrete Mathematik'
    }, {
        id: 'BTI-7001',
        name: 'Analysis'
    }, {
        id: 'BTI-7002',
        name: 'Statistik und Wahrscheinlichkeitsrechnung'
    }, {
        id: 'ABC-9001',
        name: 'Relationale Algebra'
    }, {
        id: 'ABC-9002',
        name: 'Berechenbarkeit und Komplexität'
    }
];


let Planning = {
    template: require('./planning.html'),
    data: function() {
        return {
            nrOfSem: 6,
            moduleProposals: proposals,
            modulesNextSem: [],
            modulesAfterNextSem: [],
            baseConfig: {
                group: 'modulelist',
                handle: '.handle'
            }
        }
    },
    computed: {
        cssColumnClass: function() {
            return "col-md-" + (this.nrOfSem + 1);
        },

        hasModulesNextSem: function() {
            return this.modulesNextSem.length > 0;
        },

        getModuleProposalConfig: function() {
            return this.baseConfig;
        },

        getNextSemConfig: function() {
            let _self = this;

            return Object.assign({
                onAdd: function(event) {
                    _self.modulesNextSem.push(event.item.attributes['data-module-id'].value);
                },
                onRemove: function(event) {
                    _self.modulesNextSem.pop(event.item.attributes['data-module-id'].value);
                }
            }, this.baseConfig);
        }
    }
};

export default Planning;
