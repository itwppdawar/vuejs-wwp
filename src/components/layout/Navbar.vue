<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle js-sidebar-toggle">
      <i class="hamburger align-self-center"></i>
    </a>
    <span class="sidebar-nameSide">
      {{ currentRouteName }}
    </span>

    <div class="navbar-collapse collapse">
      <ul class="navbar-nav navbar-align">
        <li class="nav-item dropdown">
          <a class="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
            <div class="position-relative">
              <i class="align-middle" data-feather="bell"></i>
              <span class="indicator">4</span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
            <div class="dropdown-menu-header">
              4 New Notifications
            </div>
            <div class="list-group">
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <i class="text-danger" data-feather="alert-circle"></i>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">Update completed</div>
                    <div class="text-muted small mt-1">Restart server 12 to complete the update.</div>
                    <div class="text-muted small mt-1">30m ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <i class="text-warning" data-feather="bell"></i>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">Lorem ipsum</div>
                    <div class="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                    <div class="text-muted small mt-1">2h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <i class="text-primary" data-feather="home"></i>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">Login from 192.186.1.8</div>
                    <div class="text-muted small mt-1">5h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <i class="text-success" data-feather="user-plus"></i>
                  </div>
                  <div class="col-10">
                    <div class="text-dark">New connection</div>
                    <div class="text-muted small mt-1">Christina accepted your request.</div>
                    <div class="text-muted small mt-1">14h ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div class="dropdown-menu-footer">
              <a href="#" class="text-muted">Show all notifications</a>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
            <i class="align-middle" data-feather="settings"></i>
          </a>
          <a class="nav-link d-none d-sm-inline-block">
              <div class="avatar bg-primary text-white avatar img-fluid rounded me-1 d-flex align-items-center justify-content-center">{{ getUserInitials() }}</div>
          </a>
          <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
            <span class="text-dark">{{ currentUser?.name || currentUser?.email || 'username' }}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="user"></i> Profile</a>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="settings"></i> Settings & Privacy</a>
            <a class="dropdown-item" href="#"><i class="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click="handleLogout">Log out</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['currentUser']),
    currentRouteName() {
      let pathName = this.$route.path.substring(1);
      return pathName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  },
  mounted() {
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Login' });
    },
    getUserInitials() {
      const user = this.currentUser;
      if (user?.name) {
        return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
      } else if (user?.email) {
        return user.email.substring(0, 2).toUpperCase();
      }
      return 'CH';
    }
  }
};
</script>
