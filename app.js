// app.js
import { Token } from '/utils/token.js'
import { Util } from '/utils/util.js'

import { UserModel } from '/models/user.js'
var userModel = new UserModel()
App({

  globalData:{
    userInfo : null,
    authorize: true,
    over: false,
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // wx.showTabBarRedDot({
    //   index: 2,
    // })
    var that = this
    var token = new Token()
    token.verify((res)=>{
      var util = new Util()
      util.checkUserInfo((res) => {
        wx.getUserInfo({
          success(e){
            that.globalData.userInfo = e.userInfo
            util.checkUserNickname((res) => {
              if (!res.checked) {
                userModel.onuserNickname(that.globalData.userInfo.nickName, that.globalData.userInfo.avatarUrl)
              }
            })
          }
        })
      }, (auth) => {
        console.log('没有授权')
        that.globalData.authorize = false
      })
    })
    that.globalData.over = true
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
