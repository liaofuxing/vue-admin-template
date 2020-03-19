import { constantRoutes } from '@/router'

const routers = {
  state: {
    RouterList: [] // 动态路由
  },

  mutations: {
    set_router: (state, routerList) => {
      state.RouterList = routerList
    }
  },

  actions: {
    // 动态设置路由 通过commit state，参数为routerList
    setRouterList({ commit }, routerList) {
      commit('set_router', constantRoutes.concat(routerList)) // 进行路由拼接并存储
    }
  }
}

export default routers
