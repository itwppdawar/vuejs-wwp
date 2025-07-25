<template>
  <nav class="navbar navbar-expand navbar-light navbar-bg">
    <a class="sidebar-toggle js-sidebar-toggle">
      <i class="hamburger align-self-center"></i>
    </a>

    <div class="navbar-collapse collapse">
      <ul class="navbar-nav navbar-align">
        <li class="nav-item dropdown">
          <a class="nav-icon dropdown-toggle" href="#" id="alertsDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <div class="text-muted small mt-1">Restart server to complete the update.</div>
                    <div class="text-muted small mt-1">30m ago</div>
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
          <a class="nav-icon dropdown-toggle" href="#" id="messagesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="position-relative">
              <i class="align-middle" data-feather="message-square"></i>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
            <div class="dropdown-menu-header">
              <div class="position-relative">
                4 New Messages
              </div>
            </div>
            <div class="list-group">
              <a href="#" class="list-group-item">
                <div class="row g-0 align-items-center">
                  <div class="col-2">
                    <div class="avatar bg-primary text-white rounded-circle">VT</div>
                  </div>
                  <div class="col-10 ps-2">
                    <div class="text-dark">Vanessa Tucker</div>
                    <div class="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                    <div class="text-muted small mt-1">15m ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div class="dropdown-menu-footer">
              <a href="#" class="text-muted">Show all messages</a>
            </div>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
            <i class="align-middle" data-feather="settings"></i>
          </a>

          <a class="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
            <div class="avatar bg-primary text-white rounded-circle me-2">CH</div>
            <span class="text-dark">{{ currentUser?.name || currentUser?.email || 'User' }}</span>
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
    ...mapGetters(['currentUser'])
  },
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
.navbar-bg {
  background-color: #fff;
  border-bottom: 1px solid #e3e6f0;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  z-index: 99;
  height: 60px;
  transition: all 0.3s;
}

.sidebar-toggle {
  color: #5a6c7d;
  background: none;
  border: 0;
  font-size: 1.25rem;
  cursor: pointer;
  margin-right: 1rem;
}

.sidebar-toggle:hover {
  color: #495057;
}

.hamburger {
  width: 18px;
  height: 18px;
}

.navbar-nav {
  margin-left: auto;
}

.nav-icon {
  position: relative;
  color: #5a6c7d;
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  text-decoration: none;
}

.nav-icon:hover {
  color: #495057;
}

.indicator {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background: #dc3545;
  border-radius: 50%;
  font-size: 0.6rem;
  color: #fff;
  text-align: center;
  line-height: 0.5rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
}

.dropdown-menu-header {
  padding: 0.75rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e3e6f0;
  font-weight: 600;
  color: #5a6c7d;
}

.dropdown-menu-footer {
  padding: 0.75rem 1.5rem;
  background: #f8f9fa;
  border-top: 1px solid #e3e6f0;
  text-align: center;
}

.dropdown-menu-lg {
  min-width: 20rem;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-bg {
    left: 0;
  }
}
</style>