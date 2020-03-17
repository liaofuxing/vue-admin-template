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
    params
  })
}

export function addRole(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/role/addRole',
    method: 'post',
    params
  })
}
