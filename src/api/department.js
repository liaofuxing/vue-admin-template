import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/department/getDepartmentList',
    method: 'get',
    params
  })
}

export function editDepartment(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/department/editDepartment',
    method: 'post',
    data: params
  })
}

export function addDepartment(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/department/addDepartment',
    method: 'post',
    data: params
  })
}

