// 判断重复请求

export default class repeatRequest {
  constructor() {
    this.pendingQueue = new Map()
  }

  testFunction() {
    console.log('this is testFunction')
  }
}

repeatRequest.prototype.addRequest = function(axiosConfig) {
  const onlyKey = this.generateString(axiosConfig)
  const queueResponse = this.pendingQueue.get(onlyKey)
  if(!!queueResponse) {
    console.warn('重复请求',axiosConfig.url)
    return false
  }
  else {
    this.pendingQueue.set(onlyKey, 'seat')
    return true
  }
}

repeatRequest.prototype.removeRequest = function(axiosConfig) {
  const onlyKey = this.generateString(axiosConfig)
  return this.pendingQueue.delete(onlyKey)
}

repeatRequest.prototype.generateString = function(axiosConfig) {
  const { method, url, params, data } = axiosConfig
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

repeatRequest.prototype.resetRequestQueue = function() {
  this.pendingQueue.clear()
}

