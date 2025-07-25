import Dashboard from "../components/Dashboard.vue";

export default [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../components/Dashboard.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'user'] }
    },
];
