// ------------------
// Imports
// ------------------

import routeLogin from '@/components/routes/login.vue'
import routeDashboard from '@/components/routes/dashboard.vue'
import routeDisplay from '@/components/routes/display.vue'



// ------------------
// Exports
// ------------------

export default [
    {
        name: 'login',
        path: '/login',
        component: routeLogin,
        meta: {public: true}
    },
    {
        name: 'dashboard',
        path: '/',
        component: routeDashboard
    },
    {
        name: 'display',
        path: '/:id',
        component: routeDisplay
    }
];