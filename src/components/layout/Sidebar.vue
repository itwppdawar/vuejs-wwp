<template>
    <nav id="sidebar" class="sidebar js-sidebar">
        <div class="sidebar-content js-simplebar">
          <router-link class="sidebar-brand" to="/beranda">
            <span class="align-middle">{{ appName }}</span>
          </router-link>
          <ul class="sidebar-nav">
            <li class="sidebar-profile">
              <div class="profile-container">
                <div class="profile-avatar">
                  <img :src="currentUser?.avatar || '/default-avatar.png'" alt="User Avatar" class="avatar-img">
                </div>
                <div class="profile-info">
                  <div class="profile-name">{{ currentUser?.name || 'User' }}</div>
                  <div class="profile-status"><i data-feather="circle" class="text-primary"></i> online</div>
                </div>
              </div>
            </li>
            <li class="sidebar-search">
              <div class="search-container">
                <i class="align-middle search-icon" data-feather="search"></i>
                <input type="text" class="search-input" placeholder="Cari menu (Ctrl + K)">
              </div>
            </li>
            <li class="sidebar-item">
              <router-link class="sidebar-link" to="#">
                <i class="align-middle" data-feather="bell"></i> <span class="align-middle">Notifikasi</span>
              </router-link>
            </li>
            <li class="sidebar-item" :class="{ active: $route.name === 'Beranda' || $route.nameRoute === 'Dashboard' }">
              <router-link class="sidebar-link" to="/beranda">
                <i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Dashboard</span>
              </router-link>
            </li>
            
            <!-- Master Data Group -->
            <li class="sidebar-item has-submenu" :class="{ active: masterDataOpen }">
              <a class="sidebar-link" href="#" @click.prevent="toggleMasterData">
                <i class="align-middle" data-feather="database"></i> 
                <span class="align-middle">Master Data</span>
                <i class="align-middle submenu-arrow" :data-feather="masterDataOpen ? 'chevron-down' : 'chevron-right'"></i>
              </a>
              <ul class="sidebar-submenu" :class="{ show: masterDataOpen }">
                <li class="sidebar-item" :class="{ active: $route.name === 'SalesOrder' || $route.nameRoute === 'Sales Order' }">
                  <router-link class="sidebar-link" to="/sales-order">
                    <i class="align-middle" data-feather="square"></i> <span class="align-middle">Sales Order</span>
                  </router-link>
                </li>
                <li class="sidebar-item" :class="{ active: $route.name === 'SalesQuotation' || $route.nameRoute === 'Sales Quotation' }">
                  <router-link class="sidebar-link" to="/sales-quotation">
                    <i class="align-middle" data-feather="check-square"></i> <span class="align-middle">Sales Quotation</span>
                  </router-link>
                </li>
                <li class="sidebar-item" :class="{ active: $route.name === 'RequestOrder' || $route.nameRoute === 'Request Order' }">
                  <router-link class="sidebar-link" to="/request-order">
                    <i class="align-middle" data-feather="bar-chart-2"></i> <span class="align-middle">Request Order</span> 
                  </router-link>
                </li>
                <li class="sidebar-item" :class="{ active: $route.name === 'SalesReport' || $route.nameRoute === 'Sales Report' }">
                  <router-link class="sidebar-link" to="/sales-report">
                    <i class="align-middle" data-feather="map"></i> <span class="align-middle">Sales Report</span>
                  </router-link>
                </li>
              </ul>
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
      appName: 'BBS Corp Surabaya',
      masterDataOpen: false
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser'])
  },
  watch: {
    masterDataOpen() {
      this.$nextTick(() => {
        if (window.feather) {
          window.feather.replace();
        }
      });
    }
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
    toggleMasterData() {
      this.masterDataOpen = !this.masterDataOpen;
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

.sidebar-profile {
  background: transparent;
  color: #ced4da;
  font-size: .75rem;
  padding:.625rem 0.725rem;
  margin-bottom: 15px;  
}

.sidebar-search {
  padding: 5px 5px;
  margin-bottom: 15px;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #2b2e5b;
  border: 1px solid #3a3f6b;
  border-radius: 0.375rem;
  padding:.625rem 0.725rem;
  transition: all 0.15s ease-in-out;
}

.search-container:hover {
  border-color: #4a4f7b;
  background-color: #343968;
}

.search-container:focus-within {
  border-color: #3b7ddd;
  box-shadow: 0 0 0 0.2rem rgba(59, 125, 221, 0.25);
  background-color: #343968;
}

.search-icon {
  color: #ced4da;
  margin-right: 0.5rem;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: #ced4da;
  padding: 0;
}

.search-input::placeholder {
  color: #8a8fa3;
  font-size: 0.875rem;
}

.search-input:focus {
  outline: none;
  color: #fff;
}

.profile-container {
  display: flex;
  align-items: center;
}

.profile-avatar {
  margin-right: 10px;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-weight: bold;
}

.profile-status {
  font-size: 12px;
  color: #666;
}

.has-submenu {
  position: relative;
}

.submenu-arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.2s ease-in-out;
}

.rotated {
  transform: translateY(-50%) rotate(180deg);
}

.sidebar-submenu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
}

.sidebar-submenu.show {
  display: block;
}

.sidebar-submenu li {
  padding:.225rem .725rem;
  border-bottom: 1px solid #3a3f6b;
}

.sidebar-submenu li:last-child {
  border-bottom: none;
}

.sidebar-submenu a {
  color: #ced4da;
  text-decoration: none;
}

.sidebar-submenu a:hover {
  color: #fff;
}
</style>