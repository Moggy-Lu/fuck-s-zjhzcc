// pages/my/my.js
import {UserModel} from '../../models/user.js'
var userModel = new UserModel()
//获取应用实例
const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse : true,
    userInfo : {},
    myMessageList:[],
    myInfo:{},
  },
  //删除动态
  onDeleteMessage:function(e){
    var that = this
    wx.showModal({
      title: '提示', 
      content: '是否删除这条动态',
      success(res) {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          let id = that.data.myMessageList[index].id
          userModel.deleteMessage(id, (res) => {
            console.log(res)
            that.onLoad()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //跳转到我的活动页面
  bindMyActiveOn: function(){
    wx.navigateTo({
      url: '../myActive/myActive',
    })
  },
  //跳转到我的动态页面
  bindMyMessageOn: function(){
    wx.navigateTo({
      url: '../myMessage/myMessage',
    })
  },
  //跳转到我的消息页面
  bindMyNoticeOn: function () {
    wx.navigateTo({
      url: '../myNotice/myNotice',
    })
  },
  //跳转到我的关注或粉丝页面
  switchFollowOrFans: function(options) {
    let type = options.currentTarget.dataset.type
    wx.navigateTo({
      url: '../myfollowOrfans/myfollowOrfans?type='+type,
    })
  },
  //页面初始化
  _init(){
    //页面标题
    wx.setNavigationBarTitle({
      title: '我的'
    })
    if (app.globalData.userInfo) {
      userModel.getMyMessage(1, (res) => {
        this.setData({
          canIUse: false,
          userInfo: app.globalData.userInfo,
          myMessageList: res,
        })
      })
      userModel.getMyInfo((res)=>{
        this.setData({
          myInfo: res
        })
      })     
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
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
    // this.getTabBar().show(2)
    this._init()
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
    this._init()
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