const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'https://go-hospital-server.herokuapp.com'},
  transpileDependencies: true,
})
