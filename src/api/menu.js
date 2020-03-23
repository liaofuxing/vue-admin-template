import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: '/system/router/getMenuTree',
    method: 'get'
  })
}

export function addMenuTree2Router(data) {
  return request({
    url: '/system/router/addMenuTree2Router',
    method: 'post',
    data
  })
}

// 校验路由名重复
export function validateRouterTitleRepeat(params) {
  return request({
    url: '/system/router/validateRouterTitleRepeat',
    method: 'get',
    params
  })
}

