Function.prototype.before = function(beforefn){
  var _self = this // 保存原函数的引用
  return function(){
    beforefn.apply(this,arguments) // 执行新函数，并保证this不被劫持，新函数接受的参数也
    return _self.apply(this,arguments)
  }
}

Function.prototype.after = function(afterFn){
  var _self = this // 保存原函数的引用
  return function(){
    const ret = afterFn.apply(this,arguments) // 执行新函数，并保证this不被劫持，新函数接受的参数也
    _self.apply(this,arguments)
    return ret
  }
}


function A(){
  console.log('a')
}

function B(){
  console.log('b')
}

const BBeforeA = A.before(B)

const BAfterA = A.after(B)

A()

BBeforeA()

BAfterA()