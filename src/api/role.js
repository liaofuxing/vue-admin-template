import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/role/getRoleList',
    method: 'get',
    params
  })
}

export function editRole(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/role/editRole',
    method: 'post',
    data: params
  })
}

export function addRole(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/role/addRole',
    method: 'post',
    data: params
  })
}

export function getRoleMenu(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/role/getRoleMenu',
    method: 'get',
    params
  })
}

// 校验角色名重复
export function validateRoleNameRepeat(params) {
  return request({
    url: 'http://localhost:8090/system/role/validateRoleNameRepeat',
    method: 'get',
    params
  })
}
