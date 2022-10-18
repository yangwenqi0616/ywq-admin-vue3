import Layout from '@/layout/index.vue';

export default [
  {
    path: '/const',
    name: 'const',
    component: Layout,
    meta: { title: '个人中心', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'my-blog',
        name: 'myBlog',
        component: () => import('@/views/Iframe.vue'),
        meta: { title: '单眼皮丶儿', icon: 'el-icon-lollipop', url: 'https://blog.csdn.net/Y_wq0616', isIframe: true }
      },
      {
        path: 'https://github.com/yangwenqi0616?tab=repositories',
        name: 'myGithub',
        component: {},
        meta: {
          title: 'GitHub',
          icon: 'el-icon-coin'
        }
      }
    ]
  }
];
