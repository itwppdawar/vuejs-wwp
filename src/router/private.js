import RequestOrder from '../components/request-order/index.vue'
import SalesReport from '../components/sales-report/index.vue'
import SalesOrder from '../components/sales-order/index.vue'
import SalesQuotation from '../components/sales-quotation/index.vue'
import Beranda from '../components/Beranda.vue'
export default [ 
    {
            path: '/beranda',
            name: 'Beranda',
            component: Beranda,
            nameRoute: 'Dashboard',
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/sales-order',
            name: 'SalesOrder',
            component: SalesOrder,
            nameRoute: 'Sales Order',
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/sales-quotation',
            name: 'SalesQuotation',
            component: SalesQuotation,
            nameRoute: 'Sales Quotation',
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/sales-report',
            name: 'SalesReport',
            component: SalesReport,
            nameRoute: 'Sales Report',
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/request-order',
            name: 'RequestOrder',
            component: RequestOrder,
            nameRoute: 'Request Order',
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
];
