// 观察者设计模式
export default class CustomerServiceApi {
  constructor() {
    this.event = new Map()
  }
}
  CustomerServiceApi.prototype.subscribe = function(eventName, callBack) {
    const eventArray = this.event.get(eventName)
    if( typeof eventArray === 'undefined' ){
      const temArray = []
      temArray.push(callBack)
      this.event.set(eventName, temArray)
    }
    else {
      this.event.get(eventName).push(callBack)
    }
  }

  CustomerServiceApi.prototype.publish = function(eventName) {
    const eventArray = this.event.get(eventName)
    if( eventArray instanceof Array ) {
      eventArray.forEach(element => {
        element()
      })
    }
  }

  CustomerServiceApi.prototype.removeSubscribe = function(eventName) {
    return this.event.delete(eventName)
  }

  CustomerServiceApi.prototype.removeSubscribeEvent = function(eventName, callBackHandle) {
    const eventArray = this.event.get(eventName)
    if( eventArray instanceof Array ) {
      const index = eventArray.indexOf(callBackHandle)
      index === -1 ? '' : eventArray.splice(index,1)
    }
  }

  CustomerServiceApi.prototype.removeAll = function() {
    this.event.clear()
  }
// }