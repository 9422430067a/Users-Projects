import DashboardLayout from '@/views/Layout/DashboardLayout.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "demo" */ '../views/User/User.vue')
      },
      {
        path: '/project',
        name: 'project',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Project/Project.vue')
      }
    ]
  },
];

export default routes;
