import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/systemUser/findSystemUserPage',
    method: 'post',
    data: params
  })
}

export function editUser(params) {
  return request({
    url: 'http://localhost:8090/system/systemUser/editSystemUser',
    method: 'post',
    data: params
  })
}

export function addUser(params) {
  return request({
    url: 'http://localhost:8090/system/systemUser/addSystemUser',
    method: 'post',
    data: params
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

