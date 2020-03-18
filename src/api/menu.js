import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: 'http://localhost:8090/system/router/getMenuTree',
    method: 'get'
  })
}
