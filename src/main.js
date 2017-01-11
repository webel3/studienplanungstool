import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

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
 */
Vue.use(VueRouter);

/*
 * Tell Vue that we want to use the plugin 'vue-resource' which provides http services
 */
Vue.use(VueResource);

/**
 * Defines available routes of the application (and also a fallback route) and is also
 * responsible that the user is authenticated before using most of the routes.
 *
 * @name AppRouter
 * @class
 *
 * @see https://github.com/vuejs/vue-router
 * @see https://router.vuejs.org/en/api/router-link.html
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


/**
 * Create a new Vue instance that serves as our application.
 *
 * @name App
 * @class
 *
 * @see https://vuejs.org/
 */
let app = new Vue({
    router: router,
    components: {
        NavigationBar
    }
});


/*
 * Bind the application to the id 'app'.
 */
app.$mount('#app');