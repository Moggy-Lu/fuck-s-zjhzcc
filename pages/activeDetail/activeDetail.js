// pages/activeDetail/activeDetail.js
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeData: null,
    uid: null,
    isMe:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activeData = JSON.parse(options.activeData)
    let uid = wx.getStorageSync('uid')
    let m = uid == activeData.creater_id?true:false
    this.setData({
      activeData: activeData,
      uid : uid,
      isMe: m,
    })
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