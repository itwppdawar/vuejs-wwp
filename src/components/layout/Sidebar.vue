<template>
    <nav id="sidebar" class="sidebar js-sidebar">
        <div class="sidebar-content js-simplebar">
          <router-link class="sidebar-brand" to="/beranda">
            <span class="align-middle">{{ appName }}</span>
          </router-link>
  
          <ul class="sidebar-nav">
            <li class="sidebar-header">
              Pages
            </li>
  
            <li class="sidebar-item" :class="{ active: $route.name === 'Beranda' }">
              <router-link class="sidebar-link" to="/beranda">
                <i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Dashboard</span>
              </router-link>
            </li>
  
            <li class="sidebar-header">
              Sales
            </li>
  
            <li class="sidebar-item" :class="{ active: $route.name === 'SalesOrder' }">
              <router-link class="sidebar-link" to="/sales-order">
                <i class="align-middle" data-feather="square"></i> <span class="align-middle">Sales Order</span>
              </router-link>
            </li>
  
            <li class="sidebar-item" :class="{ active: $route.name === 'SalesQuotation' }">
              <router-link class="sidebar-link" to="/sales-quotation">
                <i class="align-middle" data-feather="check-square"></i> <span class="align-middle">Sales Quotation</span>
              </router-link>
            </li>
  
            <li class="sidebar-header">
              Request
            </li>
  
            <li class="sidebar-item" :class="{ active: $route.name === 'RequestOrder' }">
              <router-link class="sidebar-link" to="/request-order">
                <i class="align-middle" data-feather="bar-chart-2"></i> <span class="align-middle">Request Order</span>
              </router-link>
            </li>
  
            <li class="sidebar-item" :class="{ active: $route.name === 'SalesReport' }">
              <router-link class="sidebar-link" to="/sales-report">
                <i class="align-middle" data-feather="map"></i> <span class="align-middle">Sales Report</span>
              </router-link>
            </li>

            <li class="sidebar-header">
              Account
            </li>

            <li class="sidebar-item">
              <a class="sidebar-link" href="#" @click.prevent="handleLogout">
                <i class="align-middle" data-feather="log-out"></i> <span class="align-middle">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  data() {
    return {
      appName: 'BBS Corp'
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser'])
  },
  mounted() {
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
  },
  updated() {
    // Re-initialize feather icons when component updates
    this.$nextTick(() => {
      if (window.feather) {
        window.feather.replace();
      }
    });
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Login' });
    },
    navigateTo(routeName) {
      // Alternative method for programmatic navigation if needed
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    }
  }
};
</script>

<style scoped>
/* Ensure router-link styling matches the original design */
.sidebar-link {
  color: inherit;
  text-decoration: none;
}

.sidebar-brand {
  color: inherit;
  text-decoration: none;
}

.router-link-active {
  /* Add any specific styling for active router links if needed */
}
</style>