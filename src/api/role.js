import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/role/getRoleList',
    method: 'get',
    params
  })
}

export function editRole(params) {
  return request({
    url: '/system/role/editRole',
    method: 'post',
    data: params
  })
}

export function addRole(params) {
  return request({
    url: '/system/role/addRole',
    method: 'post',
    data: params
  })
}

// 获取用户的角色菜单关系
export function getRoleMenu(params) {
  return request({
    url: '/system/role/getRoleMenu',
    method: 'get',
    params
  })
}

// 校验角色名重复
export function validateRoleNameRepeat(params) {
  return request({
    url: '/system/role/validateRoleNameRepeat',
    method: 'get',
    params
  })
}
