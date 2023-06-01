export default{
    devServer: {
      proxy: {
        '/': {
          target: 'http://localhost:4242', 
          ws: true,
          changeOrigin: true
        }
      }
    }
  }