<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <router-link class="sidebar-brand" to="/beranda">
        <span class="align-middle">BBS CORP SURABAYA</span>
      </router-link>

      <ul class="sidebar-nav">
        <li class="sidebar-header">
          Pages
        </li>

        <li class="sidebar-item" :class="{ active: $route.name === 'Beranda' }">
          <router-link class="sidebar-link" to="/beranda">
            <i class="align-middle" data-feather="sliders"></i> 
            <span class="align-middle">Dashboard</span>
          </router-link>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link collapsed" data-bs-toggle="collapse" href="#salesCollapse" role="button" aria-expanded="false" aria-controls="salesCollapse">
            <i class="align-middle" data-feather="shopping-cart"></i> 
            <span class="align-middle">Sales</span>
          </a>
          <div class="collapse" id="salesCollapse">
            <ul class="sidebar-dropdown list-unstyled">
              <li class="sidebar-item">
                <router-link class="sidebar-link" to="/sales-quotation">Quotation</router-link>
              </li>
              <li class="sidebar-item">
                <router-link class="sidebar-link" to="/sales-order">Order</router-link>
              </li>
              <li class="sidebar-item">
                <router-link class="sidebar-link" to="/sales-report">Reports</router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link collapsed" data-bs-toggle="collapse" href="#requestCollapse" role="button" aria-expanded="false" aria-controls="requestCollapse">
            <i class="align-middle" data-feather="file-text"></i> 
            <span class="align-middle">Requests</span>
          </a>
          <div class="collapse" id="requestCollapse">
            <ul class="sidebar-dropdown list-unstyled">
              <li class="sidebar-item">
                <router-link class="sidebar-link" to="/request-order">Orders</router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="sidebar-header">
          Tools & Components
        </li>

        <li class="sidebar-item">
          <router-link class="sidebar-link" to="/dashboard">
            <i class="align-middle" data-feather="grid"></i> 
            <span class="align-middle">Components</span>
          </router-link>
        </li>

        <li class="sidebar-item">
          <a class="sidebar-link" href="#" @click="handleLogout">
            <i class="align-middle" data-feather="log-out"></i> 
            <span class="align-middle">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 250px;
  background: #233240;
  transition: all 0.3s;
}

.sidebar-content {
  position: relative;
  height: calc(100vh - 2px);
  padding: 0;
  overflow-y: auto;
}

.sidebar-brand {
  display: block;
  color: #adb5bd;
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1;
  padding: 1.25rem 1.5rem;
  text-decoration: none;
  background: #1e2a36;
}

.sidebar-brand:hover {
  color: #fff;
}

.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-header {
  color: #8a98ac;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 1.5rem 1.5rem 0.75rem;
  margin: 0;
}

.sidebar-item {
  margin: 0;
}

.sidebar-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #8a98ac;
  text-decoration: none;
  border-radius: 0;
  transition: all 0.15s ease;
}

.sidebar-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.075);
}

.sidebar-item.active .sidebar-link {
  color: #fff;
  background: #495057;
}

.sidebar-link i {
  margin-right: 0.75rem;
  width: 16px;
  height: 16px;
}

.sidebar-dropdown {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar-dropdown .sidebar-item {
  padding-left: 1rem;
}

.sidebar-dropdown .sidebar-link {
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    margin-left: -250px;
  }
  
  .sidebar.toggled {
    margin-left: 0;
  }
}
</style>