//创建文件

//配置
module.exports = {
  //webpack-dev-server 这个包
  devServer: {
    //proxy 设置代理的配置项
    proxy: {
      '/api': {
        //target 真实服务器地址
        //会与url进行拼接
        //如发请求url:'/api/xxx'
        //'http://localhost:8080/api/xxx'
        target: 'https://u.y.qq.com',

        //服务器虚拟机搭建，一般设置为true
        changeOrigin: true,

        //如果真实url:'/xxx',不是'/api'开头，需要配置该项
        //自己先加上url:'/api/xxx'
        //pathRewrite路径重写通过正则自动去掉api
        //最终得到'http://localhost:8080/xxx'
        pathRewrite: {
          '^/api': ''
        }
      },

      //也可以设置其他名字的代理，同api
      '/soso': {
        target: 'https://c.y.qq.com',
        //服务器虚拟机搭建，一般设置为true
        changeOrigin: true,

        //如果真实url:'/xxx',不是'/api'开头，需要配置该项
        //自己先加上url:'/api/xxx'
        //pathRewrite路径重写通过正则自动去掉api
        //最终得到'http://localhost:8080/xxx'
        pathRewrite: {
          '^/soso': 'soso'
        }
      }
    }
  }
}
