import { constantRoutes } from '@/router'

const routers = {
  state: {
    RouterList: [] // 动态路由
  },
  
  mutations: {
    set_router: (state, RouterList) => {
      state.RouterList = RouterList
    }
  },
  
  actions: {
    // 动态设置路由 此为设置设置途径
    setRouterList({ commit }, routerList) {
      commit('set_router', constantRoutes.concat(routerList)) // 进行路由拼接并存储
    }
  }
}

  export default routers