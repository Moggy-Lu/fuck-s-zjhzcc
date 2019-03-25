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
    console.log('token:'+token)
    if(!token){
      this.getTokenFromServer(sCallBack);
    }
    else(
      sCallBack && sCallBack()
    )
  }
  //  _veirfyFromServer(token){
  //   var that = this
  //    http.request({
  //     url : that.verifyUrl,
  //     data : {
  //       token : token
  //     },
  //     success : function(res) {
  //       var valid = res.data.isValid;
  //       if (!valid) {
  //         that.getTokenFromServer();
  //       }
  //     }
  //   })
  // }
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
            console.log(res.data.token)
            sCallBack && sCallBack(res)
          }
        })
      }
    })
  }
}
export {Token}