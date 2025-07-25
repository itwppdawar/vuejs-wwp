<template>
  <div class="wrapper">
    <Sidebar />
    
    <div class="main">
      <Navbar />
      
      <main class="content">
        <div class="container-fluid p-0">
          <slot></slot>
        </div>
      </main>

      <footer class="footer">
        <div class="container-fluid">
          <div class="row text-muted">
            <div class="col-6 text-start">
              <p class="mb-0">
                <a class="text-muted" href="https://adminkit.io/" target="_blank"><strong>AdminKit</strong></a> - 
                <a class="text-muted" href="https://adminkit.io/" target="_blank"><strong>Bootstrap Admin Template</strong></a> &copy;
              </p>
            </div>
            <div class="col-6 text-end">
              <ul class="list-inline">
                <li class="list-inline-item">
                  <a class="text-muted" href="https://adminkit.io/" target="_blank">Support</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="https://adminkit.io/" target="_blank">Help Center</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="https://adminkit.io/" target="_blank">Privacy</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="https://adminkit.io/" target="_blank">Terms</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';

export default {
  name: 'DashboardLayout',
  components: {
    Sidebar,
    Navbar
  },
  mounted() {
    // Load external libraries
    this.loadExternalLibraries();
  },
  methods: {
    loadExternalLibraries() {
      // Load Feather Icons
      if (!window.feather) {
        const featherScript = document.createElement('script');
        featherScript.src = 'https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js';
        featherScript.onload = () => {
          if (window.feather) {
            window.feather.replace();
          }
        };
        document.head.appendChild(featherScript);
      } else {
        window.feather.replace();
      }

      // Load Chart.js
      if (!window.Chart) {
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
        document.head.appendChild(chartScript);
      }

      // Load Bootstrap JS for dropdowns
      if (!window.bootstrap) {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
        document.head.appendChild(bootstrapScript);
      }
    }
  }
};
</script>

