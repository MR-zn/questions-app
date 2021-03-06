/**
 * login模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块
import createStore from '../store'
var store = createStore()

const sendsms = {
  // 排行排名
  sendsms(phone) {
    return axios.post(`${base.sq}/sendsms`, qs.stringify(
      {
        api_token: store.state.token,
        phone: phone
      }
    ))
  }

  // 其他接口…………
}

export default sendsms
