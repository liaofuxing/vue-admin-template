import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function sendSmsCode(params) {
  return request({
    url: '/user/sendSmsCode',
    method: 'get',
    params
  })
}

export function phoneLogin(data) {
  return request({
    url: '/user/phoneLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 *  获取路由列表
 */
export function getRouter() {
  return request({
    url: '/system/router/getRouters',
    method: 'get'
  })
}

