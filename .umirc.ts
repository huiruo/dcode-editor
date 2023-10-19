import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  routes: [
    {
      path: '/dcode',
      component: '@/layouts/index',
      routes: [
        {
          path: '/dcode',
          component: '@/pages/index',
          name: '首页',
        },
        {
          path: '/dcode/TmpView',
          component: '@/pages/Template',
          name: '模板',
        },
      ],
    },
   {
     path: '/',
     component: '@/pages/login',
     name: '登录',
   }
  ],
  fastRefresh: {},
  antd: {
    dark: false,
    mobile: false,
  },
  plugins: [],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.16.37.190:3888',
        changeOrigin: true,
        pathRewrite: { '^/api' : '' },
      },
    },
  },
})