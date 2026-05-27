import Layout from '@/layout/index.vue';

export default [
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'home' },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          affix: true
        }
      }
    ]
  }
];
