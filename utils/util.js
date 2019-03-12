import { HTTP } from '../utils/http.js'
//获取应用实例
const app = new getApp()

class Util extends HTTP{
  constructor(){
    super()
  }
  //时间戳转换成月\日\小时\分钟
  getDate(timestamp) {
    let date = new Date(timestamp * 1000)
    let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)
    let datetime = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
    let hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
    let minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
    if (datetime == new Date().getDate()) {
      var time = hour + ':' + minute
    }
    else {
      var time = month + '/' + datetime
    }
    return time
  }
  //检测是否储存用户头像与昵称
  checkUserNickname(sCallBack, error){
    this.request({
      url:'/user/checkUserNickname',
      success:function(res){
        sCallBack && sCallBack(res)
      },
      fail:function(err){
        error&&error(err)
      }
    })
  }
  //检查是否授权用户信息
  checkUserInfo(sCallBack, authorize, eCallBack) { 
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              sCallBack && sCallBack(res)
            },
            fail(err) {
              eCallBack && eCallBack(err)
            }
          })
        }
        else{
          authorize && authorize()
        }
      }
    })
  }
  getAuthorize(){
    wx.getSetting({
      success:(res) => {
        if (!res.userInfo){
          this.getUserInfo
        }
        else{
          console.log(res)
        }
      }
    })
  }
}
export {Util}