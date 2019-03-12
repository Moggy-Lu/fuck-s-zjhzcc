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
  //页面初始化
  _init(){
    if (app.globalData.userInfo) {
      userModel.getMyMessage(1, (res) => {
        this.setData({
          canIUse: false,
          userInfo: app.globalData.userInfo,
          myMessageList: res,
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