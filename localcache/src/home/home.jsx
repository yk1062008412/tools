import React, { useState, useCallback } from 'react';
import { getCityDataModal } from '../models/home.js';

const Home = () => {
  const [resData, setResData] = useState('') // 返回的数据
  // 获取缓存数据
  const handlegetData = useCallback(() => {
    const params = {}
    getCityDataModal(params).then((data) => {
      setResData(JSON.stringify(data))
      // console.log(JSON.stringify(data))
    }).catch(error => {
      setResData(String(error))
    })
  }, [])

  // 获取新的数据
  const handleReloadData = useCallback(() => {
    const params = {}
    getCityDataModal(params, {
      forceReload: true
    }).then((data) => {
      setResData(JSON.stringify(data))
      // console.log(JSON.stringify(data))
    }).catch(error => {
      setResData(String(error))
    })
  }, [])

  return (
    <>
      <button onClick={handlegetData}>获取缓存数据</button>
      <button onClick={handleReloadData}>获取新的数据</button>
      <p>{resData}</p>
    </>
  )
}

export default Home;