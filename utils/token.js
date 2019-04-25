import { config } from '../config.js'
import { HTTP } from '../utils/http.js'
var http = new HTTP()
class Token {
  constructor(){
    this.verifyUrl = '/token/verify';
    this.tokenUrl = '/token/user';
  }
  verify(sCallBack){
    var token = wx.getStorageSync('token')
    if(!token){
      this.getTokenFromServer(sCallBack);
    }
    else(
      sCallBack && sCallBack()
    )
  }
  getTokenFromServer(sCallBack){
    var that = this
    wx.login({
      success : function(res){
        wx.request({
          url: 'https://tp5.zjhzcc.club/api/v1/token/user',
          method: 'POST',
          data: {
            code: res.code
          },
          success : function(res) {
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('uid', res.data.uid)
            sCallBack && sCallBack(res)
          },
          fail : function(res){
            console.log('fail')
          }
        })
      }
    })
  }
}
export {Token}