import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:8090/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:8090/user/info',
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

export function editUser(params) {
  return request({
    url: 'http://localhost:8090/system/systemUser/editSystemUser',
    method: 'post',
    params
  })
}

export function getRoleList() {
  return request({
    url: 'http://localhost:8090/system/role/getRoleAll',
    method: 'get'
  })
}

