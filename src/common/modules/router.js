// ------------------
// imports
// ------------------

import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/common/modules/store';
import Axios from '@/common/modules/axios';
import routes from '@/common/configs/routes'



// ------------------
// Setup
// ------------------

Vue.use(Router);



// ------------------
// Config
// ------------------

const router = new Router({
    mode: 'history',
    routes
});



// ------------------
// Guards
// ------------------

router.beforeEach((to, from, next) => {
    Axios.abort();
    if (to.meta.public) return next();
    if (!Store.state.session.token) return next('/login');
    next();
});



// ------------------
// Export
// ------------------

export default router;