import request from '@/utils/request'

export function getRouter() {
  return request({
    url: 'http://localhost:8090/system/router/getRouters',
    method: 'get'
  })
}

