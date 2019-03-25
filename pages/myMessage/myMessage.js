// pages/myMessage/myMessage.js
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoItem: {},
    page: 1,
    show: 0, //显示的是哪一栏，0代表全部，1代表原创，2代表赞，3代表转发
    likeList:{},
  },

  //切换到我的原创方法
  bindMyAcitve: function() {
    userModel.getMyMessage(1, (res) => {
      this.setData({
        infoItem: res,
        page: 1,
        show: 1,
      })
    })
  },
  //切换到我的赞方法
  bindMyLike: function () {
    userModel.getMyLike((res) => {
      this.setData({
        // infoItem: res,
        show: 2,
      })
    })
  },
  //切换到我的转发方法
  bindMyForward: function () {
    userModel.getMyMessage(1, (res) => {
      this.setData({
        // infoItem: res,
        show: 3,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userModel.getMyMessage(this.data.page, (res) => {
      this.setData({
        infoItem: res,
        page: this.data.page+1,
      })
    })
  },
  //删除信息后页面刷新
  bindDelete: function(e){
    console.log(e)
    this.onPullDownRefresh()
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
    console.log('onShow')
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
    userModel.getMyMessage(1, (res) => {
      this.setData({
        infoItem: res,
        page:2,
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    userModel.getMyMessage(this.data.page, (res) => {
      let list = this.data.infoItem
      if (res.length != 0) {
        list.push(res)
      }
      else{
        console.log('已经到底啦')
      }
      this.setData({
        infoItem: list,
        page: this.data.page+1,
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})