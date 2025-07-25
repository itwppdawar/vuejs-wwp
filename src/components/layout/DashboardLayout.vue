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
                <strong>BBS Corp Surabaya</strong> &copy; {{ new Date().getFullYear() }}
              </p>
            </div>
            <div class="col-6 text-end">
              <ul class="list-inline">
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Support</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Help Center</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Privacy</a>
                </li>
                <li class="list-inline-item">
                  <a class="text-muted" href="#" target="_blank">Terms</a>
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
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  min-height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
  transition: all 0.3s;
}

.content {
  flex: 1;
  padding: 1.5rem;
  margin-top: 60px;
  background: #f1f3f4;
}

.footer {
  background: #fff;
  border-top: 1px solid #e3e6f0;
  padding: 1rem 0;
  margin-top: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
}

/* Global AdminKit-like styles */
:global(body) {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #f1f3f4;
}

:global(.card) {
  border: 1px solid #e3e6f0;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

:global(.card-header) {
  background: #f8f9fa;
  border-bottom: 1px solid #e3e6f0;
  font-weight: 600;
}

:global(.btn-primary) {
  background-color: #3b7ddd;
  border-color: #3b7ddd;
}

:global(.btn-primary:hover) {
  background-color: #326abc;
  border-color: #326abc;
}

:global(.table) {
  color: #495057;
}

:global(.table th) {
  border-top: none;
  border-bottom: 1px solid #e3e6f0;
  font-weight: 600;
  color: #5a6c7d;
}

:global(.text-primary) {
  color: #3b7ddd !important;
}

:global(.text-success) {
  color: #1cbb8c !important;
}

:global(.text-warning) {
  color: #fcb92c !important;
}

:global(.text-danger) {
  color: #dc3545 !important;
}
</style>