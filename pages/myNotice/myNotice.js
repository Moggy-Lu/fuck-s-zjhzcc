// pages/myNotice/myNotice.js
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now: 0,
    windowHeight: 0,
    noticeList: [
      {
        uid:2,
        mid: 357,
        read: 0,
        type: 1,
        msg: "你关注的用户 DeleteP 发布了新动态",
      }, {
        uid: 2,
        mid: 357,
        read: 0,
        type: 1,
        msg: "你关注的用户 DeleteP 发布了新动态",
      }, {
        uid: 2,
        mid: 357,
        read: 0,
        type: 1,
        msg: "你关注的用户 DeleteP 发布了新动态",
      }, {
        uid: 2,
        mid: 357,
        read: 0,
        type: 1,
        msg: "你关注的用户 DeleteP 发布了新动态",
      }
    ]
  },
  //改变tag标签
  changeTag: function(options){
    let index = options.currentTarget.dataset.index
    this.setData({
      now: index
    })
  },
  //点击查看详情
  onDetail:function(options){
    let mid = options.currentTarget.dataset.mid
    wx.navigateTo({
      url: '../../pages/articleDetail/articleDetail?id=' + mid + '&like="true"'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面标题
    wx.setNavigationBarTitle({
      title: '我的消息'
    })
    // 获取当前窗口的高度
    let height = wx.getSystemInfoSync().windowHeight
    this.setData({
      windowHeight: height
    })
    userModel.getNotice((res)=>{
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