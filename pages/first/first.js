// pages/first/first.js
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
//获取应用实例
const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户权限
  bindGetUserInfo: function (e) {
    // wx.showLoading({
    //   title: '初始化',
    // })
    var that = this
    wx.getUserInfo({
      success(res) {
        console.log('eee')
        let data = res.userInfo
        userModel.onuserNickname(data.nickName, data.avatarUrl, (res)=>{
          console.log(res)
          app.globalData.authorize = true
          app.globalData.userInfo = data
          wx.hideLoading()
          wx.switchTab({
            url: '../index/index',
          })
        }, (err)=>{
          console.log(err)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})