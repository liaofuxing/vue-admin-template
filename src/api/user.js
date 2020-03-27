import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/systemUser/findSystemUserPage',
    method: 'post',
    data: params
  })
}

export function editUser(params) {
  return request({
    url: '/system/systemUser/editSystemUser',
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: '/system/systemUser/addSystemUser',
    method: 'post',
    data: params
  })
}

// 获取角色下拉
export function getRoleSelect() {
  return request({
    url: '/system/role/getRoleSelect',
    method: 'get'
  })
}

// 获取部门下拉
export function getDepartmentSelect() {
  return request({
    url: '/system/department/getDepartmentSelect',
    method: 'get'
  })
}

// 获取角色列表
export function getRoleList() {
  return request({
    url: '/system/role/getRoleList',
    method: 'get'
  })
}

// 获取部门列表
export function getDepartmentList() {
  return request({
    url: '/system/department/getDepartmentList',
    method: 'get'
  })
}

// 校验用户名重复
export function validateUsernameRepeat(params) {
  return request({
    url: '/system/systemUser/validateUsernameRepeat',
    method: 'get',
    params
  })
}

// 在线用户管理
export function getUserOnline() {
  return request({
    url: '/system/systemUser/getUserOnline',
    method: 'get'
  })
}

// 在线用户强制离线
export function userForceOffline(params) {
  return request({
    url: '/system/systemUser/userForceOffline',
    method: 'get',
    params
  })
}

