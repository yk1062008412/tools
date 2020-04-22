/*
 * @Author: carkang.yang@qunar.com
 * @Date: 2020-04-17 10:11:54
 * @LastEditors: carkang.yang@qunar.com
 * @LastEditTime: 2020-04-22 16:03:26
 * @Description: request请求
 */

import axios from 'axios';
import qs from 'qs';
import { checkCache, setCache } from './cache'

const { CancelToken } = axios

const request = axios.create({
  timeout: 30000,
  responseType: 'json',
  baseURL: 'http://yapi.demo.qunar.com/mock/100161',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  cancelToken: new CancelToken(function executor(c) {
    // console.log(c)
    // console.log('取消token方法')
    // console.log(source.token)
  })
})

// 拦截 request
request.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // 如果是需要缓存的数据 并且 本次请求不需要强制刷新, 先检查本地是否有枚举缓存
    if (config.ifCache && !config.forceReload) {
      const source = CancelToken.source()
      // 校验缓存：如果有缓存，则直接中断这次请求，并返回缓存中的数据
      config.cancelToken = source.token
      const data = checkCache(config.url);
      data && source.cancel(data)
      // 否则继续发送请求，不受影响
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 拦截 response
request.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      // 判断当前的数据是否需要缓存
      if (response.config.ifCache) {
        // 缓存数据
        const setcache = setCache(response);
        if (setcache) {
          console.log('缓存成功')
        } else {
          console.log('缓存失败')
        }
      }
      // 返回成功后的数据
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // 判断当前请求是否为取消的请求
    if (axios.isCancel(error)) {
      console.log(JSON.stringify(error))
      // 返回缓存中的数据
      return Promise.resolve(error.message)
    } else {
      return Promise.reject(error)
    }
  }
)


export default request;