// 防抖, 多次触发后，只有最后一次触发，一般应用在页面resize或者滚动等场景
const debounce = (fn,delay)=>{
 let timer = null
 return ()=>{
     if(timer){
        clearTimeout(timer) 
     }
     timer = setTimeout(fn,delay)
 }
}


// 节流，一段时间内，只能触发一次
function throttle(func, delay) {
    let run = true
    return function () {
      if (!run) {
        return  // 如果开关关闭了，那就直接不执行下边的代码
      }
      run = false // 持续触发的话，run一直是false，就会停在上边的判断那里
      setTimeout(() => {
        func.apply(this, arguments)
        run = true // 定时器到时间之后，会把开关打开，我们的函数就会被执行
      }, delay)
    }
  }