// pages/myMessage/myMessage.js
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: [{
      page: 1,
      hasMore: true,
      list: [],
      text: "动态"
    }, {
      page: 1,
      hasMore: true,
      list: [],
      text: "赞"
      }, {
        page: 1,
        hasMore: true,
        list: [],
        text: "评论"
      }],
    now: 0,
    infoItem: {},
    page: 1,
    likeList:{},
    scrollHeight: 0,
  },

  //切换到我的动态方法
  changeTag: function(options) {
    let index = options.currentTarget.dataset.index
    this.setData({
      now: index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tagList = this.data.tagList 
    userModel.getMyMessage(tagList[0].page, (res) => {
      tagList[0].list = res
      tagList[0].page += 1
      userModel.getMyLike(tagList[1].page, (res) => {
        tagList[1].list = res
        tagList[1].page += 1
        this.setData({
          tagList: tagList
        })
      })
    })
  },
  //点击tag切换
  selectTag: function (options){
    let num = options.currentTarget.dataset.index
    this.setData({
      now: num
    })
  },
  //滑动滑块切换Tag
  changeTag: function (options) {
    let num = options.detail.current
    this.setData({
      now: num
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
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight - 60
        })
      }
    })
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