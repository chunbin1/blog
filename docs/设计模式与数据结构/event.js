// var salesOffices = {}
// salesOffices.clientList = []
// salesOffices.listen = function(fn){
//   this.clientList.push(fn)
// }

// // 触发事件
// salesOffices.trigger = function(){
//   for(var i = 0, fn ;fn = this.clientList[i++];)
//   {
//     fn.apply(this,arguments)
//   }
// }

// // 观察事件
// salesOffices.listen(function(price,squareMeter){
//   console.log('价格='+price)
//   console.log('squareMeter'+ squareMeter)
// })

// salesOffices.listen(function(price,squareMeter){
//   console.log("价格="+price)
//   console.log('squareMeter'+ squareMeter)
// })

// salesOffices.trigger(20000,88)  // 发布消息
// salesOffices.trigger(300000,110)

class SalesOffices {
  constructor(clientList = {}) {
    this.clientList = clientList
  }

  listen(key, fn) {
    this.clientList[key] = fn
  }

  trigger(key, ...args) {
    this.clientList[key] && this.clientList[key](...args)
  }
}

const salesOffices = new SalesOffices()
salesOffices.listen('楼房77', function (price, squareMeter) {
  console.log('价格=' + price)
  console.log('squareMeter' + squareMeter)
})

salesOffices.listen('楼房88', function (price, squareMeter) {
  console.log("价格=" + price)
  console.log('squareMeter' + squareMeter)
})

salesOffices.trigger('楼房77', 20000, 88)
salesOffices.trigger('楼房88', 300000, 110)

