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
        { path: '/notes', component: '@/pages/list', exact: true },
        { path: '/notes/:id', component: '@/pages/edit', exact: true },
      ],
    },
  ],
});
