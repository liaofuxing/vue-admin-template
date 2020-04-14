import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function getMysqlTableSelect() {
  return request({
    url: '/generate/generateCode/getMysqlTableSelect',
    method: 'get'
  })
}

export function getTableField(params) {
  return request({
    url: '/generate/generateCode/getTableField',
    method: 'get',
    params
  })
}
export function generateCode(params) {
  const url = 'http://localhost:8090/api-gateway/generate/generateCode/generateCode'
  return XHRLoadLoadFile(url, params)
}

function XHRLoadLoadFile(url, data) {
  const xhr = new XMLHttpRequest()
  xhr.open('post', url)
  // 如果需要请求头中这是token信息可以在这设置
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.setRequestHeader('token', getToken())
  xhr.responseType = 'blob'
  xhr.send(JSON.stringify(data))
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const blob = new Blob([xhr.response])
      const url = window.URL.createObjectURL(blob)
      // 创建一个a标签元素，设置下载属性，点击下载，最后移除该元素
      const link = document.createElement('a')
      link.href = url
      link.style.display = 'none'
      // 取出下载文件名
      // const fileName = xhr.getResponseHeader('filename')
      const fileName = data.tableName + '.zip'
      const downlaodFileName = decodeURIComponent(fileName)
      link.setAttribute('download', downlaodFileName)
      link.click()
      window.URL.revokeObjectURL(url)
    }
  }
}

