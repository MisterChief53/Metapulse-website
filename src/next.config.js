module.exports = {
    reactStrictMode: true,
    proxy: {
      '/api': {
        target: `${process.env.NEXT_PUBLIC_API_BASE_URL}:8080`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
