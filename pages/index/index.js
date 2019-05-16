// pages/index/index.js
import { InfoModel} from '../../models/information.js'
let infoModule = new InfoModel()
import { UserModel } from '../../models/user.js'
let userModel = new UserModel()
import { ScheduleModel } from '../../models/classSchedule.js';
var scheduleModel = new ScheduleModel()
import { CommentModel } from '../../models/comment.js';
var commentModel = new CommentModel()
const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试数据
    itemList : [{
      url: 'https://picture.zjhzcc.club//2ecc9dab1905ea86688e88829e3827.png'
    }, {
        url: 'https://picture.zjhzcc.club//bc96db33211fa97df93e0eca850134.png'
      }, {
        url: 'https://picture.zjhzcc.club//0d7c622079f6e4ed4b8db7b4059000.png'
      }],
    tagList: [{
      page: 1,
      hasMore: true,
        list:[],
        text: "精选"
    }, {
        page: 1,
        hasMore: true,
        list:[],
        text: "关注"
      }],
    now: 0,
    hasRequest: true,
    hideComment: false,  //是否隐藏评论输入框
    mid: '',
    commentName: '',
    top: 0,   //tag栏距顶部标题栏的距离
    scrollTop: 0,    //页面滚动距离
    
  },
  //弹出评论接口
  onComment: function(event){
    let mid = event.detail.mid
    let nickname = event.detail.nickname
    console.log(mid)
    this.setData({
      hideComment: true,
      mid: mid,
      commentName: nickname,
    })
  },
  //发布评论回执函数
  bindComment: function(){
    let tagList = this.data.tagList
    let list = tagList[this.data.now].list
    for (let i in list) {
      if (list[i].id == this.data.mid) {
        list[i].sum_reply += 1
        break
      }
    }
    tagList[this.data.now].list = list
    this.setData({
      hideComment: false,
      mid: '',
      tagList: tagList
    })
  },
  //修改关注按钮状态
  onFollow: function(event){
    let follow = event.detail[0].follow
    let uid = event.detail[1].uid
    let tagList = this.data.tagList
    let list = tagList[this.data.now].list
    for(let i in list){
      if (list[i].uid == uid){
        list[i].follow = follow
      }
    }
    tagList[this.data.now].list = list
    this.setData({
      tagList: tagList
    })
  },
  //跳转到签到页面
  navCheckIn: function(res){
    wx.navigateTo({
      url: '../checkIn/checkIn'
    })
  },
  navScheduleIn: function (res) {
    scheduleModel.checkSchool((res) => {
      console.log(res)
      if(res){
        wx.navigateTo({
          url: '../classSchedule/classSchedule'
        })
      }
      else{
        wx.navigateTo({
          url: '../bindClassic/bindClassic'
        })
      }
    })
  },

//页面初始化函数
  _init: function() {
    var that = this
    let tagList = [{
      page: 1, hasMore: true, text: '精选', list: []
    }, {
        page: 1, hasMore: true, text: '关注', list: []
      }]
    infoModule.getInfoList(that.data.now, tagList[that.data.now].page, (res) => {
      tagList[that.data.now].list = res.data
      that.setData({
        tagList: tagList
      })
      wx.stopPullDownRefresh()
    }, (err)=>{
      console.log(err)
      this.setData({
        hasRequest: false
      })
    })
  },
  //网络出错重新加载
  bindRetry : function(e){
    this.onLoad()
  },
  //点击分类切换
  onTagBind: function (options) {
    let that = this
    let tagList = that.data.tagList
    let index = options.target.dataset.index
    this.setData({
      now: index
    })
    if(tagList[index].list.length == 0){
      infoModule.getInfoList(index, tagList[index].page, (res) => {
        tagList[index].list = res.data
        that.setData({
          tagList: tagList
        })
        wx.stopPullDownRefresh()
      }, (err) => {
        console.log(err)
        this.setData({
          hasRequest: false
        })
      })
    }
  },
  //点击搜索栏跳转搜索页面
  bindSearchOn: function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //监听页面滚动
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },

  onLoad: function (options) {
    var that = this
    let couTime = setInterval(function(){
      wx.showLoading({
        title: '初始化',
      })
      const query = wx.createSelectorQuery()
      query.select('.classify-box').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        that.setData({
          top: res[0].top
        })
      })
      if(app.globalData.over){
        wx.hideLoading()
        clearInterval(couTime)
        if (!app.globalData.authorize) {
          wx.redirectTo({
            url: '../../pages/first/first',
          })
        }
      }
    }, 200)
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
    // this.getTabBar().show(0)
    if (!app.globalData.authorize){
      wx.redirectTo({
        url: '../../pages/first/first',
      })
    }
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
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    this._init()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    let tagList = this.data.tagList
    let now = this.data.now
    if(tagList[now].hasMore){
      let pageNum = tagList[now].page
      pageNum++
      infoModule.getInfoList(now, pageNum, (res)=> {
        if (res.data.length != 0) {
          tagList[now].list = tagList[now].list.concat(res.data)
          tagList[now].page = pageNum
        }
        else {
          tagList[now].hasMore = false
          console.log('已经到头了')
        }
        that.setData({
          tagList: tagList
        })
      })
    }
    else{
      console.log('已经到头了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})