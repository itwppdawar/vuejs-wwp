<template>
  <DashboardLayout>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Analytics Dashboard</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">Invite a Friend</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">New Project</button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards Row -->
    <div class="row mb-4">
      <div class="col-xl-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Sales</h5>
                <span class="h2 font-weight-bold mb-0">2,382</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                  <i class="fas fa-chart-bar"></i>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <span class="text-danger mr-2">
                <i class="fas fa-arrow-down"></i> 3.65%
              </span>
              <span class="text-nowrap">Since last week</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Visitors</h5>
                <span class="h2 font-weight-bold mb-0">14,212</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                  <i class="fas fa-chart-pie"></i>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <span class="text-success mr-2">
                <i class="fas fa-arrow-up"></i> 5.25%
              </span>
              <span class="text-nowrap">Since last week</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Earnings</h5>
                <span class="h2 font-weight-bold mb-0">$21,300</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-success text-white rounded-circle shadow">
                  <i class="fas fa-dollar-sign"></i>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <span class="text-success mr-2">
                <i class="fas fa-arrow-up"></i> 6.65%
              </span>
              <span class="text-nowrap">Since last week</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0">Orders</h5>
                <span class="h2 font-weight-bold mb-0">64</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                  <i class="fas fa-shopping-cart"></i>
                </div>
              </div>
            </div>
            <p class="mt-3 mb-0 text-muted text-sm">
              <span class="text-danger mr-2">
                <i class="fas fa-arrow-down"></i> 2.25%
              </span>
              <span class="text-nowrap">Since last week</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Tables Row -->
    <div class="row">
      <!-- Recent Movement Chart -->
      <div class="col-12 col-lg-8 col-xxl-9 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title mb-0">Recent Movement</h5>
          </div>
          <div class="card-body py-3">
            <div class="chart chart-sm">
              <canvas id="chartjs-dashboard-line" style="height: 300px;"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Browser Usage -->
      <div class="col-12 col-lg-4 col-xxl-3 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title mb-0">Browser Usage</h5>
          </div>
          <div class="card-body d-flex">
            <div class="align-self-center w-100">
              <div class="py-3">
                <div class="chart chart-xs">
                  <canvas id="chartjs-dashboard-pie"></canvas>
                </div>
              </div>
              <table class="table mb-0">
                <tbody>
                  <tr>
                    <td>Chrome</td>
                    <td class="text-end">4306</td>
                  </tr>
                  <tr>
                    <td>Firefox</td>
                    <td class="text-end">3801</td>
                  </tr>
                  <tr>
                    <td>Edge</td>
                    <td class="text-end">1689</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Projects Table -->
    <div class="row">
      <div class="col-12 col-xl-6">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Latest Projects</h5>
          </div>
          <table class="table table-hover my-0">
            <thead>
              <tr>
                <th>Name</th>
                <th class="d-none d-xl-table-cell">Company</th>
                <th class="d-none d-xl-table-cell">Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar bg-primary text-white rounded-circle me-2">
                      AP
                    </div>
                    <div>
                      <strong>Project Apollo</strong><br>
                      <small class="text-muted">Web, UI/UX Design</small>
                    </div>
                  </div>
                </td>
                <td class="d-none d-xl-table-cell">
                  <strong>Lechters</strong><br>
                  <small class="text-muted">Real Estate</small>
                </td>
                <td class="d-none d-xl-table-cell">
                  <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-success" style="width: 65%"></div>
                  </div>
                  <small class="text-muted">65%</small>
                </td>
                <td>
                  <button class="btn btn-sm btn-primary">View</button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar bg-warning text-white rounded-circle me-2">
                      PB
                    </div>
                    <div>
                      <strong>Project Bongo</strong><br>
                      <small class="text-muted">Web Development</small>
                    </div>
                  </div>
                </td>
                <td class="d-none d-xl-table-cell">
                  <strong>Cellophane Transportation</strong><br>
                  <small class="text-muted">Transportation</small>
                </td>
                <td class="d-none d-xl-table-cell">
                  <div class="progress" style="height: 6px;">
                    <div class="progress-bar bg-warning" style="width: 33%"></div>
                  </div>
                  <small class="text-muted">33%</small>
                </td>
                <td>
                  <button class="btn btn-sm btn-primary">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Calendar -->
      <div class="col-12 col-xl-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Calendar</h5>
            <h6 class="card-subtitle text-muted">Simple calendar widget for quick overview</h6>
          </div>
          <div class="card-body">
            <div id="datetimepicker-dashboard" class="w-100"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Welcome Message for logged in user -->
    <div class="row mt-4" v-if="isLoggedIn">
      <div class="col-12">
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Welcome, {{ currentUser?.name || currentUser?.email }}!</h4>
          <p>You are successfully logged in to the BBS Corp Surabaya ERP System.</p>
          <p class="mb-0">Role: <strong>{{ currentUser?.role }}</strong></p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DashboardLayout from './layout/DashboardLayout.vue';

export default {
  name: 'Beranda',
  components: {
    DashboardLayout
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser', 'message'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Login' });
    }
  },
  mounted() {
    // Initialize charts if Chart.js is available
    this.initCharts();
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Login' });
    },
    initCharts() {
      // Simple chart initialization - you can expand this with actual Chart.js
      console.log('Charts would be initialized here with Chart.js');
    }
  }
};
</script>

<style scoped>
.icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-shape {
  border-radius: 50%;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.bg-warning {
  background-color: #ffc107 !important;
}

.bg-success {
  background-color: #28a745 !important;
}

.bg-info {
  background-color: #17a2b8 !important;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.chart {
  position: relative;
  height: 300px;
}

.chart-sm {
  height: 250px;
}

.chart-xs {
  height: 150px;
}
</style>

