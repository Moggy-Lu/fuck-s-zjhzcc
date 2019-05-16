// pages/otherHome/otherHome.js
import { InfoModel } from '../../models/information.js'
let infoModule = new InfoModel()
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    follow: false,
    uid: 0,
    infoItem: [],
    page : 1,
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面标题
    wx.setNavigationBarTitle({
      title: 'Ta的主页'
    })
    let uid = options.uid
    let follow = options.follow
    userModel.getUserInfo(uid, (res)=>{
      console.log(res)
      this.setData({
        userInfo: res
      })
    })
    infoModule.getMessageByUid(1, uid, (res)=>{
      this.setData({
        infoItem: res.data,
        follow: follow,
        uid: uid
      })
    })
  },

//关注与取消关注方法
  onFollowBind: function(){
    var that = this
    let content = ''
    if(that.data.follow){
       content = '是否取消关注'
    }
    else{
      content = '是否关注'
    }
    wx.showModal({
      title: '提示',
      content: content,
      success(res) {
        if (res.confirm) {
          let uid = that.data.uid
          userModel.onFollow(uid, (res) => {
            console.log(res)
            that.setData({
              follow: !that.data.follow
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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