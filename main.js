import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import ResultsComponent from './src/components/results/results-component';
import StandardStudyPlanComponent from './src/components/studyplan/studyplan-component';
import ModulesComponent from './src/components/modules/modules-component';
import PlanningComponent from './src/components/planning/planning-component';
import TimetableComponent from './src/components/timetable/timetable-component';

/*
 * Tell Vue that we want to use the 'vue-resource' plugin
 * which provides services for making web requests.
 *
 * documentation:
 * https://github.com/pagekit/vue-resource
 */
Vue.use(VueResource);

/*
 * Use vue-router to let the framework switch between different content.
 * This brings the advantage that no page reloads are done when switching content.
 *
 * documentation:
 * https://github.com/vuejs/vue-router
 * https://router.vuejs.org/en/api/router-link.html
 */
Vue.use(VueRouter);

// define available routes of the application.
let router = new VueRouter({
    routes : [
        { path: '/results', component: ResultsComponent },
        { path: '/studyplan', component: StandardStudyPlanComponent },
        { path: '/modules', component: ModulesComponent },
        { path: '/planning', component: PlanningComponent },
        { path: '/timetable', component: TimetableComponent },
        { path: '*', redirect: '/results'}
    ],
    history: true
});

// create a new Vue instance and start the application.
let app = new Vue({ router });
app.$mount('#app');