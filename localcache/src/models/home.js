/*
 * @Author: carkang.yang@qunar.com
 * @Date: 2020-04-17 13:39:00
 * @LastEditors: carkang.yang@qunar.com
 * @LastEditTime: 2020-04-17 16:13:38
 * @Description: Home页面
 */

import request from '../utils/request'

/**
 * 获取数据
 * @param {请求参数} params 
 * @param {其他配置项} propsParam 
 */
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