class Heap {
  // 0最大堆 \ 1最小多
  constructor(arr = [], sortBy = 0) {
    this.Heap = [];
    this.sortBy = sortBy;
    for (let i = 0; i < arr.length; i++) {
      this.Heap[i + 1] = arr[i];
    }
    for (let i = Math.floor(this.Heap.length / 2); i >= 1; i--) {
      // 从尾部一直往下移动数据到正确的位置
      this.shiftDown(i);
    }
  }

  // 向下给index节点找位置
  shiftDown(index) {
    while (2 * index < this.Heap.length) {
      // 与子节点交换
      let i = 2 * index;
      if (i + 1 < this.Heap.length && this.compare(i + 1, i)) {
        // 与两个子节点中更小的交换位置
        i += 1;
      }
      // 已经移到了正确位置
      if (this.compare(index, i)) {
        break;
      }
      this.swap(index, i);
      index = i; // 子节点继续向下交换
    }
  }

  // 向上找最合适的位置
  shiftUp(index) {
    while (index > 1 && this.compare(index, Math.floor(index / 2))) {
      this.swap(Math.floor(index / 2), index);
      index = Math.floor(index / 2);
    }
  }

  compare(i, j) {
    return this.sortBy === 0
      ? this.Heap[i] > this.Heap[j] // 最大堆
      : this.Heap[i] < this.Heap[j]; // 最小堆
  }

  insert(num) {
    this.Heap.push(num);
    this.shiftUp(this.getLenth());
  }

  pop() {
    let item;
    // 把最尾巴的提到最上 做shiftDown操作
    item = this.Heap[1];
    this.swap(1, this.getLenth());
    this.Heap.pop(); // 去掉尾节点
    this.shiftDown(1);
    return item;
  }

  getLenth() {
    return this.Heap.length - 1;
  }

  swap(i, j) {
    if (i !== j) {
      const temp = this.Heap[i];
      this.Heap[i] = this.Heap[j];
      this.Heap[j] = temp;
    }
  }
}

// leetcode 
/**
 * initialize your data structure here.
 */
 var MedianFinder = function() {
  this.maxTree = new Heap([]) // 保存大的数
  this.minTree = new Heap([],1) // 保存小的数
};

/** 
* @param {number} num
* @return {void}
*/
MedianFinder.prototype.addNum = function(num) {

};

/**
* @return {number}
*/
MedianFinder.prototype.findMedian = function() {

};

/**
* Your MedianFinder object will be instantiated and called as such:
* var obj = new MedianFinder()
* obj.addNum(num)
* var param_2 = obj.findMedian()
*/
