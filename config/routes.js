export default [

  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/EmptyLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/home',
            title: '首页',
          },
          {
            path: '/blocks',
            component: './Browser/Blocks',
            title: '区块列表',
          },
          {
            path: '/trades',
            component: './Browser/Trades',
            title: '交易列表',
          },
          {
            path: '/detail',
            component: './Browser/components/Detail',
            title: '详情',
          },
          {
            path: '/home',
            name: 'home',
            component: './Browser/Home',
            title: '首页',
          },
          {
            component: './404',
          },
        ],
      },

      {
        component: './404',
      },
    ],
  },

  {
    component: './404',
  },
];
