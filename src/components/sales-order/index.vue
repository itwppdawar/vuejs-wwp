<template>
  <DashboardLayout>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Sales Order</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <router-link to="/sales-order/create" class="btn btn-sm btn-primary">
            <i class="fas fa-plus"></i> Add New Sales Order
          </router-link>
        </div>
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
      <div class="card-header">
        <h5 class="card-title mb-0">Sales Orders List</h5>
      </div>
      <div class="card-body">
        <DataTable
          :data="salesOrders"
          :columns="columns"
          :options="tableOptions"
          class="table table-striped table-hover"
          ref="dataTable"
        />
      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
DataTable.use(DataTablesCore);

import { mapGetters, mapActions } from 'vuex';
import DashboardLayout from '../layout/DashboardLayout.vue';
import ErpService from '../../service/erp.service';

export default {
  name: 'RequestOrderIndex',
  components: {
    DashboardLayout,
    DataTable
  },
  data() {
    return {
      salesOrders: [],
      loading: true,
      error: null,
      columns: [
        {
          title: 'ID',
          data: 'id',
          width: '80px'
        },
        {
          title: 'Request Number',
          data: 'request_number',
          render: function(data, type, row) {
            return data || 'N/A';
          }
        },
        {
          title: 'Customer',
          data: 'customer_name',
          render: function(data, type, row) {
            return data || row.customer || 'N/A';
          }
        },
        {
          title: 'Status',
          data: 'status',
          render: function(data, type, row) {
            const statusClass = this.getStatusClass(data);
            return `<span class="badge ${statusClass}">${data || 'Pending'}</span>`;
          }.bind(this)
        },
        {
          title: 'Total Amount',
          data: 'total_amount',
          render: function(data, type, row) {
            if (data) {
              return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
              }).format(data);
            }
            return 'N/A';
          }
        },
        {
          title: 'Request Date',
          data: 'request_date',
          render: function(data, type, row) {
            if (data) {
              return new Date(data).toLocaleDateString('id-ID');
            }
            return row.created_at ? new Date(row.created_at).toLocaleDateString('id-ID') : 'N/A';
          }
        },
        {
          title: 'Actions',
          data: null,
          orderable: false,
          render: function(data, type, row) {
            return `
              <div class="btn-group btn-group-sm" role="group">
                <button class="btn btn-outline-primary btn-sm view-btn" data-id="${row.id}" title="View">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm edit-btn" data-id="${row.id}" title="Edit">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${row.id}" title="Delete">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `;
          }
        }
      ],
      tableOptions: {
        responsive: true,
        pageLength: 25,
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        order: [[0, 'desc']],
        language: {
          search: "Search orders:",
          lengthMenu: "Show _MENU_ entries",
          info: "Showing _START_ to _END_ of _TOTAL_ entries",
          paginate: {
            first: "First",
            last: "Last",
            next: "Next",
            previous: "Previous"
          },
          emptyTable: "No Sales orders found",
          zeroRecords: "No matching records found"
        },
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser'])
  },
  methods: {
    ...mapActions(['logout']),
    
    async fetchSalesOrders() {
      try {
        this.loading = true;
        this.error = null;
        
        const response = await ErpService.salesOrder();
        console.log('API Response:', response.data);
        
        // Handle different response structures
        if (response.data) {
          if (Array.isArray(response.data)) {
            this.salesOrders = response.data;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            this.salesOrders = response.data.data;
          } else if (response.data.result && Array.isArray(response.data.result)) {
            this.salesOrders = response.data.result;
          } else {
            this.salesOrders = [];
            console.warn('Unexpected response structure:', response.data);
          }
        } else {
          this.salesOrders = [];
        }
        
        console.log('Processed sales orders:', this.salesOrders);
        
      } catch (error) {
        console.error('Error fetching sales orders:', error);
        this.error = 'Failed to load sales orders. Please try again later.';
        
        if (error.response) {
          if (error.response.status === 401) {
            this.error = 'Authentication failed. Please login again.';
            this.$router.push({ name: 'Login' });
          } else if (error.response.status === 403) {
            this.error = 'Access denied. You do not have permission to view this data.';
          } else {
            this.error = `Server error: ${error.response.data?.message || error.response.statusText}`;
          }
        } else if (error.request) {
          this.error = 'Network error. Please check your connection and try again.';
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
            text: 'sales order deleted successfully',
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
    
    setupTableEvents() {
      this.$nextTick(() => {
        if (this.$refs.dataTable && this.$refs.dataTable.dt) {
          const table = this.$refs.dataTable.dt;
          
          // Handle action button clicks
          table.on('click', '.view-btn', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            this.handleView(id);
          });
          
          table.on('click', '.edit-btn', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            this.handleEdit(id);
          });
          
          table.on('click', '.delete-btn', (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            this.handleDelete(id);
          });
        }
      });
    }
  },
  
  async mounted() {
    await this.fetchSalesOrders();
    this.setupTableEvents();
  },
  
  updated() {
    this.setupTableEvents();
  }
};
</script>

<style scoped>
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