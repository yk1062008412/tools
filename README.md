# tools
实用小工具

项目主要存放一些常用的使用小工具

# Content

## json2excel

**作用：** 一维的json转为Excel文件
**原理：** exceljs 和 fs
**用途：** 将一维的json数组数据文件，转为Excel文件并输出

## localcache

**作用：** 拦截有些不需要重复获取数据的接口
**原理：** 通过 axios 的 interceptors 拦截器进行拦截
**优点：** 减少服务器压力，减少前端接口的重复请求次数
**用途：** 变化频率不高的枚举值 || 用户菜单权限列表 || 用户个人信息等

