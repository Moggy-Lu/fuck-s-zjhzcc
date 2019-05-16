// pages/myfollowOrfans/myfollowOrfans.js
import { UserModel } from '../../models/user.js'
let userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoData: [],
    type: null, //1代表我的关注，2代表我的粉丝
  },


  //点击用户查看用户详情
  onUserBind: function(options){
    let index = options.currentTarget.dataset.index
    let uid = this.data.type == 1 ? this.data.userInfoData[index].follow : this.data.userInfoData[index].uid
    console.log(uid)
    wx.navigateTo({
      url: '../../pages/otherHome/otherHome?follow=true'  + '&&uid=' + uid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title = ''
    let type = null
    if (options.type == 'follow'){
      title = '我的关注'
      type = 1
    }
    else{
      title = '我的粉丝'
      type = 2
    }
    //页面标题
    wx.setNavigationBarTitle({
      title: title
    })
    let uid = wx.getStorageSync('uid')
    userModel.getFollowList(uid, type, (res)=>{
      this.setData({
        userInfoData: res,
        type: type
      })
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