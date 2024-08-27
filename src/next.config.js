module.exports = {
    reactStrictMode: true,
    proxy: {
      '/api': {
        target: 'http://10.103.160.60:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
