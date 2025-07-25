// Import Modules
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Beranda from '../components/Beranda.vue'

export default [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { guest: true }
    },
    {
        path: '/beranda',
        name: 'Beranda',
        component: Beranda,
        meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
];
