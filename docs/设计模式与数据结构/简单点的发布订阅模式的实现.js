class EventEmitter {
  constructor() {
    this.cache = {};
  }

  listen(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  trigger(name, ...args) {
    if (this.cache[name]) {
      // 避免回调函数内继续注册相同事件
      let tasks = [...this.cache[name]];
      for (let fn of tasks) {
        fn(...args);
      }
    }
  }

  unlisten(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }
}

const a = new EventEmitter()
const cb = ()=>{
  console.log('hi')
}
a.listen('hi',cb)
a.trigger('hi')
a.unlisten('hi',cb)
a.trigger('hi')