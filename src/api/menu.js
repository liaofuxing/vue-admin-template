import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: 'http://localhost:8090/system/router/getMenuTree',
    method: 'get'
  })
}

export function addMenuTree2Router(data) {
  return request({
    url: 'http://localhost:8090/system/router/addMenuTree2Router',
    method: 'post',
    data
  })
}

// 校验路由名重复
export function validateRouterTitleRepeat(params) {
  return request({
    url: 'http://localhost:8090/system/router/validateRouterTitleRepeat',
    method: 'get',
    params
  })
}

