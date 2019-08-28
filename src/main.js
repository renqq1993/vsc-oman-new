import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import i18n from '@/i18n/i18n'
import store from '@/store'
import App from './App'
import router from './router'
import '@/assets/icon/iconfont.css'   // 引入第三方图标
import '@/assets/icon/iconfont1.css' 

import config from '../static/config'

Vue.config.productionTip = false

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(ElementUI)

// 读取项目配置
Vue.prototype.$config = config

// 利用vue-router提供的钩子函数beforeEach()对路由进行判断
router.beforeEach((to, from, next) => {
  
  // console.log(to)
  // console.log(from)
  // console.log(next)
  // 在路由元信息指定哪些页面需要登录权限
  // if (to.meta.requireAuth && !window.localStorage.getItem("username")) { 
  //   next('/login')                          // 跳转到登录
  //   return
  // } 
  
  next()
})

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
