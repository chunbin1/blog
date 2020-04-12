import { defineConfig } from 'umi';

export default defineConfig({
  title: "春饼的blog",
  base: "/blog/",
  publicPath:'/blog/',
  hash: true,
  history: { type: "hash" },
  favicon:'/blog/favicon.ico',
  logo: '/blog/logo.png'
});
