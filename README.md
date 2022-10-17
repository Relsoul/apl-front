# 安装
```
npm install
```

# 运行
```
npm run dev
```
- 访问本地ip:[http://localhost:5173/](http://localhost:5173/)
- 访问局域网ip: http://yourip:5173

ps:由于pwa依赖的`Service Worker`设置,非本地(包含localhost和127.0.0.1)和非Https的服务端口均不会弹出安装，故调试pwa请访问本地ip:5173而非局域网ip:5173

# build&运行
```
npm run build
npx http-server dist
```
ps: 由于`/lookup`接口不支持除本地ip外的cros,部署的情况下请搭建中间层进行proxy请求,同时修改`api.ts`中的baseURL


# 支持特性
- [x] PWA
- [x] 移动端响应式
- [x] 深色/浅色 模式自适应

# src目录结构
- components
- - content.vue `中间列表层`
- - header.vue `头部搜索层`
- - top.vue `头部推荐层`
- lib
- - api.ts `api请求库`
- - resize.ts `复写的响应式rem调整库`
- - utils.ts `工具类`
