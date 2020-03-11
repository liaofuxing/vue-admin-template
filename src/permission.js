import router from '@/router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getRouter } from './api/login'
import { addRouter } from './utils/addRouter'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
var data = false
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        // 用户已经登录，并且路由的获取状态为false
        if (data) {
          next()
        } else {
          gotoRouter(to, next)
        }
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function gotoRouter(to, next) {
  getRouter(store.getters.token) // 获取动态路由的方法
    .then(res => {
      const asyncRouter = addRouter(res.data) // 进行递归解析
      // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
      // asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
      return asyncRouter
    })
    .then(asyncRouter => {
      // let routerArr = router.options.routes;
      // let routerAll = routerArr.concat(asyncRouter)
      router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
      data = true // 记录路由获取状态
      store.dispatch('setRouterList', asyncRouter) // 存储到vuex
      console.log(store.state.routers.RouterList)
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
    .catch(e => {
      console.log(e)
    })
}
