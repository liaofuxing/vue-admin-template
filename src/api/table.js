import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://192.168.31.100:8090/system/systemUser/findSystemUserList',
    method: 'post',
    params
  })
}
