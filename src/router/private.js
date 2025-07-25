export default [
    {
        path: '/dashboard',
        name: 'admin.dashboard',
        component: () => import('../components/Dashboard.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'user'] }
    },
    {
        path: '/admin/page-example',
        name: 'admin.page.example',
        component: () => import('../components/Dashboard.vue'), // Temporarily using Dashboard component
        meta: { requiresAuth: true, roles: ['admin', 'user'] }
    },
];
