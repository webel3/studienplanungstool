import Vue from 'vue';
import VueRouter from 'vue-router';

import Results from './src/pages/results/results';
import StudyPlan from './src/pages/studyplan/studyplan';
import Modules from './src/pages/modules/modules';
import Planning from './src/pages/planning/planning';
import Timetable from './src/pages/timetable/timetable';

import NavigationBar from './src/components/navigation-bar/navigation-bar';

/*
 * Use vue-router to let the framework switch between different content.
 * This brings the advantage that no page reloads are done when switching content.
 *
 * documentation:
 * https://github.com/vuejs/vue-router
 * https://router.vuejs.org/en/api/router-link.html
 */
Vue.use(VueRouter);

// define available routes of the application (and also a fallback route).
let router = new VueRouter({
    routes : [
        { path: '/results', component: Results },
        { path: '/studyplan', component: StudyPlan },
        { path: '/modules', component: Modules },
        { path: '/planning', component: Planning },
        { path: '/timetable', component: Timetable },
        { path: '*', redirect: '/results'}
    ],
    history: true
});



// create a new Vue instance that serves as our application.
let app = new Vue({
    router: router,
    components: {
        NavigationBar
    }
});

// bind the application to the id 'app'.
app.$mount('#app');