// pages/myActive/myActive.js
import { ActiveModel } from '../../models/active.js'
var activeModel = new ActiveModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查看自己历史活动
    activeModel.onAllMyActive(1, (res)=>{
      console.log(res)
      this.setData({
        activeList:res.data
      })
    })
    // activeModel.onStartSign(13, (res)=>{
    //   console.log(res)
    // })
    activeModel.getQrcode(13, 1, (res)=>{
      console.log(res)
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