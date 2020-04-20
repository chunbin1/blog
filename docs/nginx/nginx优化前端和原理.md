# 使用nginx优化前端资源
## 强缓存
```
    if ($request_uri ~* .(js|css)$) {
        add_header Cache-Control  "public,max-age=31536000,immutable";
    }
```
### 适用场景
所有的js和css打包的时候都使用hash唯一标识
### 原理
- 浏览器使用Cache-Control做缓存控制，`max-age=31536000,immutable`告诉浏览器可以缓存，下次加载资源浏览器先从本地缓存拿，返回`200(from memory cache)`从内存或者`200(from dist cache)`从本地
- 前端打包时候改变的文件使用hash标识，只有文件改变才修改hash
### 拓展
[webpack的hash策略](https://juejin.im/post/5d7eedf0e51d4562165535ae#heading-1)


## gzip
```
    gzip on; #看 开启gzip
    gzip_min_length 1k; # 大于该值 g
    gzip_comp_level 2; # gzip的力度,越大越消耗服务器性能
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss application/rss+xml application/atom+xml image/svg+xml; # 标识gzip的类型
```

### 适用场景
几乎所有,但是照片等不适合gzip,会变得更大

### 原理
- 请求时候`accept-encoding`字段，告诉服务器能接受的编码方式，Response Headers中 `coding-encoding`告诉浏览器解码方式
- [gzip的算法原理](https://juejin.im/post/5b793126f265da43351d5125#heading-3) todo: 哈夫曼树复习

### 优化
gzip会消耗服务器性能，而以nginx为例，它会先搜寻.gz文件并返回，所以我们只要提前压缩好放在服务器中，可以减少一步服务器压缩的过程，使用`compression-webpack-plugin`即可完成