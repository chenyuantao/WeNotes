import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/list', exact: true },
        { path: '/notes', component: '@/pages/list', exact: true },
        { path: '/notes/:id', component: '@/pages/edit', exact: true },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3004',
      changeOrigin: true,
    },
  },
});
