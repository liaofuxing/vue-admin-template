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

// 获取角色下拉
export function getRoleSelect() {
  return request({
    url: 'http://localhost:8090/system/role/getRoleSelect',
    method: 'get'
  })
}

// 获取部门下拉
export function getDepartmentSelect() {
  return request({
    url: 'http://localhost:8090/system/department/getDepartmentSelect',
    method: 'get'
  })
}

// 获取角色列表
export function getRoleList() {
  return request({
    url: 'http://localhost:8090/system/role/getRoleList',
    method: 'get'
  })
}

// 获取部门列表
export function getDepartmentList() {
  return request({
    url: 'http://localhost:8090/system/department/getDepartmentList',
    method: 'get'
  })
}

