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
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/sales-order',
            name: 'SalesOrder',
            component: SalesOrder,
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/sales-quotation',
            name: 'SalesQuotation',
            component: SalesQuotation,
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/sales-report',
            name: 'SalesReport',
            component: SalesReport,
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
    {
            path: '/request-order',
            name: 'RequestOrder',
            component: RequestOrder,
            meta: { requiresAuth: true, roles: ['user','superadmin'] }
    },
];
