import { createRouter, createWebHistory } from 'vue-router'
import privateRoute from './private'
import publicRoute from './public'
import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  routes: [...privateRoute, ...publicRoute],
});

router.beforeEach((to) => {
  const isLoggedIn = store.getters.isLoggedIn;
  const user = store.getters.currentUser;

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: 'Login' };
  }

  if (to.meta.guest && isLoggedIn) {
    return { name: 'Beranda' };
  }

  if (to.meta.roles && isLoggedIn) {
    const userRole = user?.data?.role || user?.role;
    const roleToCheck = Array.isArray(userRole) ? userRole[0] : userRole;
    if (!to.meta.roles.includes(roleToCheck)) {
      console.log('User role:', roleToCheck, 'Required roles:', to.meta.roles);
      return { name: 'Login' };
    }
  }
});

export default router;