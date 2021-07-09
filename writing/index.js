function addOne(x){
  return x + 1
}

function mutilyTwo(x,y=1){
  return x * y * 2
}

function compose(...fns) {
  // eslint-disable-next-line func-names
  return function (x, ...extra) {
    return fns.reduceRight((arg, fn) => {
      return fn(arg, ...extra);
    }, x);
  };
}
// const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];


const composeFn = compose(addOne,mutilyTwo)


const a = 2
const b = composeFn(a,2)
console.log(b)
// console.log(
//   composeFn(a)
// )