import Layout from '@/layout'

/**
 * 生成路由
 * @param {Array} routerlist 格式化路由
 * @returns
 */
export function addRouter(routerlist) {
  const router = []
  routerlist.forEach(e => {
    let new_router = {
      name: e.name,
      path: e.path,
      meta: {
        title: e.title,
        icon: e.icon
      },
      redirect: e.redirect
    }

    if (e.children) {
      new_router = Object.assign({}, new_router, { children: addRouter(e.children) })
    }
    if (e.redirect) {
      new_router = Object.assign({}, new_router, { redirect: e.redirect })
    }
    if (e.hidden === 1) {
      new_router = Object.assign({}, new_router, { hidden: true })
    }
    if (e.component === 'Layout') {
      new_router.component = Layout
    } else {
      const value = e.component
      new_router.component = function component(resolve) {
        require(['@/views' + value], resolve)
      }
    }
    router.push(new_router)
  })
  return router
}
