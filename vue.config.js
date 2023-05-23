export default{
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:4242', 
          ws: true,
          changeOrigin: true
        }
      }
    }
  }