import Vue from 'vue';
import VueRouter from 'vue-router';

import Results from './pages/results/results';
import StudyPlan from './pages/studyplan/studyplan';
import Modules from './pages/modules/modules';
import Planning from './pages/planning/planning';
import Timetable from './pages/timetable/timetable';
import Login from './pages/login/login';

import NavigationBar from './components/navigation-bar/navigation-bar';

/*
 * Use vue-router to let the framework switch between different content.
 * This brings the advantage that no page reloads are done when switching content.
 *
 * documentation:
 *   https://github.com/vuejs/vue-router
 *   https://router.vuejs.org/en/api/router-link.html
 */
Vue.use(VueRouter);

/*
 * Define available routes of the application (and also a fallback route).
 *
 * documentation for vue-router meta properties:
 *   https://router.vuejs.org/de/
 */
let router = new VueRouter({
    routes : [{
            path: '/results',
            component: Results,
            meta: { requiresAuth: true }
        }, {
            path: '/studyplan',
            component: StudyPlan,
            meta: { requiresAuth: true }
        }, {
            path: '/modules',
            component: Modules,
            meta: { requiresAuth: true }
        }, {
            path: '/planning',
            component: Planning,
            meta: { requiresAuth: true }
        }, {
            path: '/timetable',
            component: Timetable,
            meta: { requiresAuth: true }
        }, {
            path: '/login',
            component: Login
        }, {
            path: '*',
            redirect: '/results'
        }
    ],
    history: true
});


/*
 * Before each router's transition, check if the targeted route requires
 * an authentication and whether the user is authenticated.
 * If not, redirect the user to the login page.
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !sessionStorage.getItem('user')) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
});


/*
 * Create a new Vue instance that serves as our application.
 */
let app = new Vue({
    router: router,
    components: {
        NavigationBar
    }
});


// bind the application to the id 'app'.
app.$mount('#app');