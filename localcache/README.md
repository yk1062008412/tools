# localcache

## 作用

拦截有些不需要重复获取数据的接口

## 前提

- 网络请求 axios
- 项目基于 create-react-app

## 安装

```
npm install
```

## 运行

```
npm run start
```

## 用法

（以本项目目录为例，实际项目可根据需要自己引入）

### models 引入

```
import request from '../utils/request'
```

### 使用request代替axios调取接口

```
export function getCityDataModal(params, propsParam) {
  let props = propsParam ? propsParam : {}
  return request({
    url: '/getCityData',
    method: 'post',
    data: params,
    ifCache: true,
    ...props
  })
}
```

### 页面调用获取数据方法

```
import { getCityDataModal } from '../models/home.js';
getCityDataModal(params).then((data) => {
  setResData(JSON.stringify(data))
}).catch(error => {
  setResData(String(error))
})
```

## 配置

### ifCache

使用 **ifCache** 判断该请求的结果，返回的数据是否需要被缓存起来

ifCache: true 表示需要缓存数据，下次调该接口的时候，不需要请求

ifCache: false 或者不设置，则走正常的获取数据接口

```
export function getCityDataModal(params, propsParam) {
  let props = propsParam ? propsParam : {}
  return request({
    url: '/getCityData',
    method: 'post',
    data: params,
    ifCache: true,
    ...props
  })
}
```

### forceReload

使用 **forceReload** 可以重新获取该接口的数据，并将本次获取的数据缓存下来，之后都使用的是本次缓存的数据

```
getCityDataModal(params, {
  forceReload: true
}).then((data) => {
  setResData(JSON.stringify(data))
  // console.log(JSON.stringify(data))
}).catch(error => {
  setResData(String(error))
})
```

### 存储方式

默认使用localStorage,

可以手动改为sessionStorage方式，在utils/cache.js修改

## 核心代码

```
// 如果是需要缓存的数据 并且 本次请求不需要强制刷新, 先检查本地是否有枚举缓存
if (config.ifCache && !config.forceReload) {
  const source = CancelToken.source()
  // 校验缓存：如果有缓存，则直接中断这次请求，并返回缓存中的数据
  config.cancelToken = source.token
  const data = checkCache(config.url);
  data && source.cancel(data)
  // 否则继续发送请求，不受影响
}
```

## 原理

1. 通过 axios 的 request.interceptors 拦截器进行检查
2. 如果 ifCache 为 true，则先检查是否有该接口的缓存数据
3. 如果有缓存数据，则直接返回缓存过的数据
4. 如果没有缓存数据，则请求接口，并将接口返回回来的数据缓存起来，等待下次被调用
5. 如果 forceReload 为 true，则直接请求接口，返回结果替换之前缓存的数据

## 注意

代码 localStorage 命名 key 为 接口名称，如果不同接口，但名称重复，则需要做兼容方案，否则会产生bug。

# last update

2020-04-22
