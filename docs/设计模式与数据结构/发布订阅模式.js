//订阅者构造器
class Subscribe {
  constructor(name = 'subscriber') {
    this.name = name
    //随机id模拟唯一
    this.id = 'id-' + Date.now() + Math.ceil(Math.random() * 10000)
  }
  listen({
    publisher,//订阅的是哪个发布者
    message,//订阅的消息
    handler//收到消息后的处理方法
  }) {
    //订阅消息的回调函数
    this[message + "_handler"] = handler
    publisher && publisher.addListener(this, message)
    return this
  }
  unlisten(publisher, message) {
    publisher && publisher.removeListener(this, message)
    return this
  }
}

//发布者构造器
class Publish {
  constructor(name = 'publisher') {
    this.messageMap = {} //消息事件订阅者集合对象
    //随机id模拟唯一
    this.id = 'id-' + Date.now() + Math.ceil(Math.random() * 10000)
    this.name = name
  }

  addListener(subscriber, message) { //添加消息订阅者
    if (!subscriber || !message) return false

    if (!this.messageMap[message]) { //如果消息列表不存在，就新建
      this.messageMap[message] = []
    }

    const existIndex = this.messageMap[message].findIndex(exitSubscriber => exitSubscriber.id === subscriber.id)
    if (existIndex === -1) {//不存在这个订阅者时添加
      this.messageMap[message].push(subscriber)
    } else {//存在这个订阅者时更新回调handler
      this.messageMap[message][existIndex][message + "_handler"] = subscriber[message + "_handler"]
    }
  };

  removeListener(subscriber, message) { //删除消息订阅者
    if (!subscriber) return false

    //如果传了message只删除此message下的订阅关系，否则删除此订阅者的所有订阅关系
    const messages = message ? [message] : Object.keys(this.messageMap)

    messages.forEach(message => {
      const subscribers = this.messageMap[message];

      if (!subscribers) return false;

      let i = subscribers.length;
      while (i--) {
        if (subscribers[i].id === subscriber.id) {
          subscribers.splice(i, 1)
        }
      }

      if (!subscribers.length) delete this.messageMap[message]
    })
  };

  publish(message, info) { //发布通知
    const subscribers = this.messageMap[message]

    if (!subscribers || !subscribers.length) return this

    subscribers.forEach(subscriber => subscriber[message + "_handler"](info))

    return this
  };

};
