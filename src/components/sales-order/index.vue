<template>
  <DashboardLayout>
    <div class="row align-items-center mb-3">
      <div class="col-auto">
        <span class="h4">Filter Status : </span>
      </div>
      <div class="col-auto">
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-success">Aktif</button>
          <span>|</span>
          <button class="btn btn-sm btn-outline-danger">Non Aktif</button>
        </div>
      </div>
      <div class="col-auto ms-auto">
        <router-link to="/sales-order/create" class="btn btn-sm btn-outline-primary">
          <i class="fas fa-plus"></i> Add New Sales Order
        </router-link>
      </div>
    </div>
    <!-- filter action -->
    <div class="row align-items-center mb-3">
      <div class="col-auto">
        <div class="search-button">
          <div class="search-container">
            <i class="align-middle search-icon fas fa-search"></i>
            <input type="text" class="search-input" placeholder="(Ctrl + f)">
          </div>
        </div>
      </div>
      <div class="col-auto">
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-danger" @click="bulkDelete" :disabled="selectedRows.length === 0">
            <i class="fas fa-trash"></i>
          </button>
          <button class="btn btn-sm btn-success" @click="bulkView" :disabled="selectedRows.length === 0">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-primary" @click="bulkEdit" :disabled="selectedRows.length === 0">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-secondary" @click="bulkPrint" :disabled="selectedRows.length === 0">
            <i class="fas fa-print"></i>
          </button>
        </div>
      </div>
      <div class="d-flex col-auto ms-auto gap-2">
        <a href="#" class="text-decoration-none text-secondary"><i class="fas fa-file-csv fa-xl mt-3"></i> </a>
        <a href="#" class="btn btn-sm btn-outline-secondary"><i class="fas fa-refresh"></i> </a>
        <select class="form-select form-select-sm" v-model="itemsPerPage">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="alert alert-danger" role="alert">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>

    <!-- Data Table -->
    <div v-if="!loading && !error" class="card">
      <div class="card-body">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="allSelected" @change="toggleSelectAll">
                </div>
              </th>
              <th scope="col" @click="sortBy('id')" :class="{ 'text-primary': sortColumn === 'id' }">
                ID
                <i class="fas" :class="getSortIcon('id')"></i>
              </th>
              <th scope="col" @click="sortBy('request_number')" :class="{ 'text-primary': sortColumn === 'request_number' }">
                Request Number
                <i class="fas" :class="getSortIcon('request_number')"></i>
              </th>
              <th scope="col" @click="sortBy('customer_name')" :class="{ 'text-primary': sortColumn === 'customer_name' }">
                Customer
                <i class="fas" :class="getSortIcon('customer_name')"></i>
              </th>
              <th scope="col" @click="sortBy('status')" :class="{ 'text-primary': sortColumn === 'status' }">
                Status
                <i class="fas" :class="getSortIcon('status')"></i>
              </th>
              <th scope="col" @click="sortBy('total_amount')" :class="{ 'text-primary': sortColumn === 'total_amount' }">
                Total Amount
                <i class="fas" :class="getSortIcon('total_amount')"></i>
              </th>
              <th scope="col" @click="sortBy('request_date')" :class="{ 'text-primary': sortColumn === 'request_date' }">
                Request Date
                <i class="fas" :class="getSortIcon('request_date')"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :value="order.id" v-model="selectedRows">
                </div>
              </td>
              <td>{{ order.id }}</td>
              <td>{{ order.request_number || 'N/A' }}</td>
              <td>{{ order.customer_name || order.customer || 'N/A' }}</td>
              <td>
                <span class="badge" :class="getStatusClass(order.status)">
                  {{ order.status || 'Pending' }}
                </span>
              </td>
              <td>{{ formatCurrency(order.total_amount) }}</td>
              <td>{{ order.request_date ? new Date(order.request_date).toLocaleDateString('id-ID') : (order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID') : 'N/A') }}</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between col-auto ms-auto align-items-center">
          <div>
            Showing {{ startItem }} to {{ endItem }} of {{ filteredOrders.length }} entries
          </div>
          <nav aria-label="Page navigation" style="margin: inherit;">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage = 1">First</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
            </li>
            <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ 'active': currentPage === page }">
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="currentPage = totalPages">Last</a>
            </li>
          </ul>
        </nav>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DashboardLayout from '../layout/DashboardLayout.vue';
import ErpService from '../../service/erp.service';

export default {
  name: 'RequestOrderIndex',
  components: {
    DashboardLayout
  },
  data() {
    return {
      salesOrders: [],
      loading: true,
      error: null,
      exportOption: '',
      filters: {
        request_number: '',
        customer_name: '',
        status: ''
      },
      selectedRows: [],
      itemsPerPage: 10,
      currentPage: 1,
      sortColumn: '',
      sortAscending: true
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    uniqueCustomers() {
      return [...new Set(this.salesOrders.map(order => order.customer_name || order.customer).filter(Boolean))];
    },
    uniqueStatuses() {
      return [...new Set(this.salesOrders.map(order => order.status).filter(Boolean))];
    },
    filteredOrders() {
      let filtered = this.salesOrders.filter(order => {
        return (
          (this.filters.request_number === '' || (order.request_number && order.request_number.toLowerCase().includes(this.filters.request_number.toLowerCase()))) &&
          (this.filters.customer_name === '' || (order.customer_name || order.customer) === this.filters.customer_name) &&
          (this.filters.status === '' || order.status === this.filters.status)
        );
      });

      // Apply sorting
      if (this.sortColumn) {
        filtered.sort((a, b) => {
          let aVal = a[this.sortColumn] || '';
          let bVal = b[this.sortColumn] || '';
          
          if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
          }
          
          if (aVal < bVal) return this.sortAscending ? -1 : 1;
          if (aVal > bVal) return this.sortAscending ? 1 : -1;
          return 0;
        });
      }

      return filtered;
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + parseInt(this.itemsPerPage);
      return this.filteredOrders.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },
    visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(total);
        } else if (current >= total - 3) {
          pages.push(1);
          pages.push('...');
          for (let i = total - 4; i <= total; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(total);
        }
      }
      
      return pages;
    },
    startItem() {
      return this.filteredOrders.length === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endItem() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredOrders.length);
    },
    allSelected() {
      return this.paginatedOrders.length > 0 && this.selectedRows.length === this.paginatedOrders.length;
    }
  },
  methods: {
    ...mapActions(['logout']),
    
    async fetchSalesOrders() {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await ErpService.salesOrder();
        console.log('Sales Orders Response:', response);
        
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            this.salesOrders = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            this.salesOrders = response.data.data;
          } else {
            console.warn('Unexpected response structure:', response.data);
            this.salesOrders = [];
          }
        } else {
          this.salesOrders = [];
        }
        
        console.log('Processed Sales Orders:', this.salesOrders);
        
      } catch (error) {
        console.error('Error fetching sales orders:', error);
        this.error = 'Failed to load sales orders. Please try again.';
        this.salesOrders = [];
        
        if (error.response?.status === 401) {
          this.$notify({
            title: 'Session Expired',
            text: 'Please login again',
            type: 'warning'
          });
          this.logout();
          this.$router.push('/login');
        }
      } finally {
        this.loading = false;
      }
    },
    
    getStatusClass(status) {
      const statusLower = (status || '').toLowerCase();
      switch (statusLower) {
        case 'completed':
        case 'approved':
          return 'bg-success';
        case 'pending':
          return 'bg-warning';
        case 'rejected':
        case 'cancelled':
          return 'bg-danger';
        case 'processing':
          return 'bg-info';
        default:
          return 'bg-secondary';
      }
    },
    
    getSortIcon(column) {
      if (this.sortColumn === column) {
        return this.sortAscending ? 'fa-sort-up' : 'fa-sort-down';
      }
      return 'fa-sort';
    },
    
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortColumn = column;
        this.sortAscending = true;
      }
    },
    
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedRows = [];
      } else {
        this.selectedRows = this.paginatedOrders.map(order => order.id);
      }
    },
    
    applyFilters() {
      this.currentPage = 1;
    },
    
    exportData() {
      // Implement export logic here
      console.log('Export option:', this.exportOption);
      console.log('Selected rows:', this.selectedRows);
    },
    
    formatCurrency(amount) {
      if (amount) {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(amount);
      }
      return 'N/A';
    },
    
    handleView(id) {
      this.$router.push({ name: 'SalesOrderView', params: { id } });
    },
    
    handleEdit(id) {
      this.$router.push({ name: 'SalesOrderEdit', params: { id } });
    },
    
    async handleDelete(id) {
      if (confirm('Are you sure you want to delete this sales order?')) {
        try {
          console.log('Delete sales order:', id);
          this.$notify({
            title: 'Success',
            text: 'Sales order deleted successfully',
            type: 'success'
          });
          this.fetchSalesOrders(); 
        } catch (error) {
          console.error('Error deleting sales order:', error);
          this.$notify({
            title: 'Error',
            text: 'Failed to delete sales order',
            type: 'error'
          });
        }
      }
    },
    
    async bulkDelete() {
      if (confirm(`Are you sure you want to delete ${this.selectedRows.length} sales orders?`)) {
        try {
          console.log('Bulk delete sales orders:', this.selectedRows);
          this.$notify({
            title: 'Success',
            text: 'Sales orders deleted successfully',
            type: 'success'
          });
          this.fetchSalesOrders(); 
        } catch (error) {
          console.error('Error deleting sales orders:', error);
          this.$notify({
            title: 'Error',
            text: 'Failed to delete sales orders',
            type: 'error'
          });
        } finally {
          this.selectedRows = [];
        }
      }
    },
    
    bulkView() {
      if (this.selectedRows.length > 0) {
        this.$router.push({ name: 'SalesOrderView', params: { id: this.selectedRows[0] } });
      }
    },
    
    bulkEdit() {
      if (this.selectedRows.length > 0) {
        this.$router.push({ name: 'SalesOrderEdit', params: { id: this.selectedRows[0] } });
      }
    },
    
    bulkPrint() {
      console.log('Bulk print:', this.selectedRows);
    }
  },
  
  async mounted() {
    await this.fetchSalesOrders();
  }
};
</script>

<style scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.search-container:focus-within {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.search-icon {
  color: #6c757d;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 0.875rem;
  color: #495057;
}

.search-input::placeholder {
  color: #6c757d;
}
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.btn-group-sm > .btn, .btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* DataTable styling */
:deep(.dataTables_wrapper) {
  font-size: 0.9rem;
}

:deep(.dataTables_filter input) {
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
}

:deep(.dataTables_length select) {
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.375rem 0.75rem;
}

:deep(.page-link) {
  color: #0d6efd;
}

:deep(.page-item.active .page-link) {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

/* Action buttons styling */
.btn-group .btn {
  margin-right: 2px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}

/* Badge styling */
.badge {
  font-size: 0.75em;
}
</style>