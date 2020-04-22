/*
 * @Author: carkang.yang@qunar.com
 * @Date: 2020-04-17 15:17:46
 * @LastEditors: carkang.yang@qunar.com
 * @LastEditTime: 2020-04-22 16:08:46
 * @Description: 操作缓存数据，可以根据需要，将 localStorage 换成 sessionStorage
 */

const getItem = key => window.localStorage.getItem(key);
const setItem = (key, value) => window.localStorage.setItem(key, value);
const removeItem = key => window.localStorage.removeItem(key);

/**
 * 检查该URL请求的数据是否在缓存中
 * @param {URL为唯一标识，不能重复} url 
 */
export function checkCache(url) {
  const urlStr = String(url).replace('/', '')
  const result = getItem(urlStr)
  if (result) {
    return JSON.parse(result)
  } else {
    return false
  }
}

/**
 * 设置缓存
 * @param {响应的数据} response 
 */
export function setCache(response) {
  const { config } = response
  try {
    const key = String(config.url).replace('/', '')
    const value = JSON.stringify(response.data)
    if (getItem(key)) {
      removeItem(key)
    }
    setItem(key, value)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}