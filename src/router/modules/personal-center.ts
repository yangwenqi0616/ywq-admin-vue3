import Layout from '@/layout/index.vue';

export default [
  {
    path: '/const',
    name: 'const',
    component: Layout,
    meta: { title: '个人中心', icon: 'Plus' },
    children: [
      {
        path: 'my-blog',
        name: 'myBlog',
        component: () => import('@/views/Iframe.vue'),
        meta: {
          title: '单眼皮丶儿',
          icon: 'Edit',
          url: 'https://blog.csdn.net/Y_wq0616',
          isIframe: true
        }
      },
      {
        path: 'https://gitee.com/y-wq/ywq-admin-vue3',
        name: 'myGithub',
        component: {},
        meta: {
          title: 'GitHub',
          icon: 'Search',
        }
      }
    ]
  }
];
