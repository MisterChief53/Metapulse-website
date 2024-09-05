module.exports = {
    reactStrictMode: true,
    proxy: {
      '/api': {
        target: NEXT_PUBLIC_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
