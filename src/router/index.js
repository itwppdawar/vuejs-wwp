import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Beranda from '../components/Beranda.vue'


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/beranda',
        name: 'Beranda',
        component: Beranda
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router