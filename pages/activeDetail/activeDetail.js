// pages/activeDetail/activeDetail.js
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
import { ActiveModel } from '../../models/active.js'
var activeModel = new ActiveModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeData: null,
    uid: null,
    isMe:false,
    isBegin : false,
    baseUrl: 'https://tp5.zjhzcc.club/',
    hiddenModel: false,
    qrCodeUrl: '',
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

  //开始活动签到
  beginActive: function(){
    activeModel.onStartSign(this.data.activeData.id, (res)=>{
      console.log(res)
      this.setData({
        isBegin: true,
      })
    })
  },
  //获取签到二维码
  getQrCode: function(){
    activeModel.getQrcode(this.data.activeData.id, 1, (res)=>{
      let url = res.url
      url = this.data.baseUrl + url
      this.setData({
        hiddenModel: true,
        qrCodeUrl: url
      })
    })
  },
  onHiddenModel: function(){
    this.setData({
      hiddenModel: false
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