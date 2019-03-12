import { HTTP } from '../utils/http.js'

class ActiveModel extends HTTP {
  constructor() {
    super()
  }
  //发起新的活动
  createNewActive(data, sCallBack, complete) {
    this.request({
      url: '/event/createEvent',
      method:'POST',
      data: data,
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      fail:(err) =>{
        console.log(err)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
  //查看所有活动
  onAllActive(page, sCallBack, complete) {
    this.request({
      url: '/event/getEvent',
      data:{
        page:page,
        size:5,
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
  //开始签到并获取签到次数
  onStartSign(eid, sCallBack, complete) {
    this.request({
      url:'/event/startSign',
      data:{
        eid:eid
      },
      method:'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
  //获取签到二维码
  getQrcode(eid, times, sCallBack, complete){
    this.request({
      url: '/event/createQrcode',
      data: {
        eid: eid,
        times:times
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
  //获取已签到信息
  getEventSigned(eid, times, sCallBack, complete){
    this.request({
      url:'/event/getEventSigned',
      data:{
        eid:eid,
        times:times
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
}
export { ActiveModel }