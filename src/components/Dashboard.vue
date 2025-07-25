<template>
  <DashboardLayout>
    <h1 class="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>

    <div class="row">
      <div class="col-xl-6 col-xxl-5 d-flex">
        <div class="w-100">
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Sales</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="truck"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">2.382</h1>
                  <div class="mb-0">
                    <span class="text-danger"><i class="mdi mdi-arrow-bottom-right"></i> -3.65%</span>
                    <span class="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Visitors</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="users"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">14.212</h1>
                  <div class="mb-0">
                    <span class="text-success"><i class="mdi mdi-arrow-bottom-right"></i> 5.25%</span>
                    <span class="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Earnings</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="dollar-sign"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">$21.300</h1>
                  <div class="mb-0">
                    <span class="text-success"><i class="mdi mdi-arrow-bottom-right"></i> 6.65%</span>
                    <span class="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col mt-0">
                      <h5 class="card-title">Orders</h5>
                    </div>
                    <div class="col-auto">
                      <div class="stat text-primary">
                        <i class="align-middle" data-feather="shopping-cart"></i>
                      </div>
                    </div>
                  </div>
                  <h1 class="mt-1 mb-3">64</h1>
                  <div class="mb-0">
                    <span class="text-danger"><i class="mdi mdi-arrow-bottom-right"></i> -2.25%</span>
                    <span class="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-6 col-xxl-7">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Recent Movement</h5>
          </div>
          <div class="card-body py-3">
            <div class="chart chart-sm">
              <canvas ref="lineChart" id="chartjs-dashboard-line"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Browser Usage</h5>
          </div>
          <div class="card-body d-flex">
            <div class="align-self-center w-100">
              <div class="py-3">
                <div class="chart chart-xs">
                  <canvas ref="pieChart" id="chartjs-dashboard-pie"></canvas>
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
                    <td>IE</td>
                    <td class="text-end">1689</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Real-Time</h5>
          </div>
          <div class="card-body px-4">
            <div id="world_map" style="height:350px;">
              <div class="text-center text-muted py-5">World Map Placeholder</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title mb-0">Calendar</h5>
          </div>
          <div class="card-body d-flex">
            <div class="align-self-center w-100">
              <div class="chart">
                <div id="datetimepicker-dashboard">
                  <div class="text-center text-muted py-3">Calendar Placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-8 col-xxl-9 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title mb-0">Latest Projects</h5>
          </div>
          <table class="table table-hover my-0">
            <thead>
              <tr>
                <th>Name</th>
                <th class="d-none d-xl-table-cell">Start Date</th>
                <th class="d-none d-xl-table-cell">End Date</th>
                <th>Status</th>
                <th class="d-none d-md-table-cell">Assignee</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projects" :key="project.name">
                <td>{{ project.name }}</td>
                <td class="d-none d-xl-table-cell">{{ project.startDate }}</td>
                <td class="d-none d-xl-table-cell">{{ project.endDate }}</td>
                <td><span :class="`badge bg-${project.statusColor}`">{{ project.status }}</span></td>
                <td class="d-none d-md-table-cell">{{ project.assignee }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xxl-3 d-flex">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Monthly Sales</h5>
          </div>
          <div class="card-body d-flex w-100">
            <div class="align-self-center chart chart-lg">
              <canvas ref="barChart" id="chartjs-dashboard-bar"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DashboardLayout from './layout/DashboardLayout.vue';

export default {
  name: 'Dashboard',
  components: {
    DashboardLayout
  },
  data() {
    return {
      projects: [
        {
          name: 'Project Apollo',
          startDate: '01/01/2023',
          endDate: '31/06/2023',
          status: 'Done',
          statusColor: 'success',
          assignee: 'Vanessa Tucker'
        },
        {
          name: 'Project Fireball',
          startDate: '01/01/2023',
          endDate: '31/06/2023',
          status: 'Cancelled',
          statusColor: 'danger',
          assignee: 'William Harris'
        },
        {
          name: 'Project Hades',
          startDate: '01/01/2023',
          endDate: '31/06/2023',
          status: 'Done',
          statusColor: 'success',
          assignee: 'Sharon Lessman'
        },
        {
          name: 'Project Nitro',
          startDate: '01/01/2023',
          endDate: '31/06/2023',
          status: 'In progress',
          statusColor: 'warning',
          assignee: 'Vanessa Tucker'
        },
        {
          name: 'Project Phoenix',
          startDate: '01/01/2023',
          endDate: '31/06/2023',
          status: 'Done',
          statusColor: 'success',
          assignee: 'William Harris'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser', 'message'])
  },
  mounted() {
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
    
    // Initialize charts
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
    },
    initCharts() {
      // Line chart
      if (this.$refs.lineChart && window.Chart) {
        const ctx = this.$refs.lineChart.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
        gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
        
        new window.Chart(this.$refs.lineChart, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: "Sales ($)",
              fill: true,
              backgroundColor: gradient,
              borderColor: "#3b7ddd",
              data: [2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917, 3327]
            }]
          },
          options: {
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
              y: {
                ticks: { stepSize: 1000 },
                display: true,
                grid: { color: "rgba(0,0,0,0.1)" }
              },
              x: {
                grid: { color: "rgba(0,0,0,0.0)" }
              }
            }
          }
        });
      }

      // Pie chart
      if (this.$refs.pieChart && window.Chart) {
        new window.Chart(this.$refs.pieChart, {
          type: "pie",
          data: {
            labels: ["Chrome", "Firefox", "IE"],
            datasets: [{
              data: [4306, 3801, 1689],
              backgroundColor: ["#3b7ddd", "#fcb92c", "#dc3545"],
              borderWidth: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            cutout: '75%'
          }
        });
      }

      // Bar chart
      if (this.$refs.barChart && window.Chart) {
        new window.Chart(this.$refs.barChart, {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
              label: "This year",
              backgroundColor: "#3b7ddd",
              borderColor: "#3b7ddd",
              hoverBackgroundColor: "#3b7ddd",
              hoverBorderColor: "#3b7ddd",
              data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
              barPercentage: .75,
              categoryPercentage: .5
            }]
          },
          options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                grid: { display: false },
                ticks: { stepSize: 20 }
              },
              x: {
                grid: { color: "transparent" }
              }
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}

.main {
  flex: 1;
  min-height: 100vh;
  margin-left: 250px;
  transition: all 0.3s;
  background-color: #f1f3f4;
}

.content {
  flex: 1 1 auto;
  padding: 1.5rem;
}

.stat {
  background: rgba(59, 125, 221, 0.1);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-primary {
  color: #3b7ddd !important;
}

.text-danger {
  color: #dc3545 !important;
}

.text-success {
  color: #1cbb8c !important;
}

.text-muted {
  color: #8a98ac !important;
}

.card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 1.5rem;
}

.card-header {
  padding: 1rem 1.5rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  border-top-left-radius: calc(0.5rem - 1px);
  border-top-right-radius: calc(0.5rem - 1px);
}

.card-body {
  flex: 1 1 auto;
  padding: 1.5rem;
}

.card-title {
  margin-bottom: 0.75rem;
  color: #495057;
  font-weight: 600;
}

.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
}

.bg-success {
  background-color: #1cbb8c !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.bg-warning {
  background-color: #fcb92c !important;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #495057;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #eef2f7;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #eef2f7;
  font-weight: 600;
  color: #495057;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.025);
}

.footer {
  background: #fff;
  border-top: 1px solid #eef2f7;
  padding: 1rem 0;
  margin-top: auto;
}

.list-inline {
  list-style: none;
  margin: 0;
  padding-left: 0;
}

.list-inline-item {
  display: inline-block;
}

.list-inline-item:not(:last-child) {
  margin-right: 1rem;
}

.h3 {
  font-size: 1.75rem;
  font-weight: 600;
}

.mb-0 { margin-bottom: 0; }
.mb-3 { margin-bottom: 1rem; }
.mt-1 { margin-top: 0.25rem; }
.my-0 { margin-top: 0; margin-bottom: 0; }
.py-3 { padding-top: 1rem; padding-bottom: 1rem; }
.px-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
.p-0 { padding: 0; }

.text-start { text-align: left; }
.text-end { text-align: right; }

.d-flex { display: flex; }
.d-none { display: none; }
.flex-fill { flex: 1 1 auto; }
.w-100 { width: 100%; }
.align-self-center { align-self: center; }

.chart {
  position: relative;
}

.chart-sm {
  height: 230px;
}

.chart-xs {
  height: 200px;
}

.chart-lg {
  height: 300px;
}

.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
  
  .d-none.d-md-table-cell {
    display: none !important;
  }
  
  .d-none.d-xl-table-cell {
    display: none !important;
  }
}

@media (min-width: 768px) {
  .d-md-table-cell {
    display: table-cell !important;
  }
}

@media (min-width: 1200px) {
  .d-xl-table-cell {
    display: table-cell !important;
  }
}
</style>