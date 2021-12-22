/* 项目打包配置文件，可以把模板项目例的通用打包配置放在脚手架里维护，用户不用关心打包配置 */
const path = require('path')
// const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin')

// const isDev = process.env.NODE_ENV === 'development'
const name = 'admin'

// 官方配置说明 https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
  module:'development',
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    // 自动启动浏览器
    open: true,
    port: 9000,
    // 浏览器弹出错误
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置多个代理
    // detail: https://cli.vuejs.org/config/#devserver-proxy
    proxy: {
      '^/images': {
        target: 'http://localhost:81',
        ws: true,
        changeOrigin: true
      },
      '^/swagger': {
        target: 'http://localhost:81',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // 发布时关闭警告
    performance: {
      hints: false
    },
    resolveLoader: {
      modules: ['node_modules']
    },
    plugins:[]
  },
  // webpack配置
  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/common.scss";`
      }
    }
  }
}
