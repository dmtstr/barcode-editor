// ------------------
// Imports
// ------------------

import routeLogin from '@/components/routes/login/index.vue'
import routeDashboard from '@/components/routes/dashboard/index.vue'
import routeTemplate from '@/components/routes/template/index.vue'



// ------------------
// Exports
// ------------------

export default [
    {
        path: '/login',
        component: routeLogin,
        meta: {public: true}
    },
    {
        path: '/',
        component: routeDashboard
    },
    {
        path: '/new',
        component: routeTemplate,
        meta: {
            type: 'fresh'
        }
    },
    {
        path: '/:id',
        component: routeTemplate
    }
];