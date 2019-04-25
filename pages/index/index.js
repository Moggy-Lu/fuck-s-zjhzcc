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
    radioHidden: false,
    screenList:['兼职', '求助', '失物招领', '推广', '全部'],
    now: 0,
    hasRequest: true,
    infoListHeight: 0,
    top: 0, //精选栏离顶部距离
    hasScroll: false, //scroll-view是否可以滚动
    scrollHeight: null,  //scroll-view的高度
    swiperHeight: 0,   // swiper的高度  
    tag: '全部',
    hideComment: false,  //是否隐藏评论输入框
    commentText: '', //输入框文本
    mid: '',
  },
  //弹出评论接口
  onComment: function(event){
    let mid = event.detail.mid
    this.setData({
      hideComment: true,
      mid: mid,
    })
  },
  //点击其他位置隐藏
  hiddenComment: function(event){
    this.setData({
      hideComment: false,
      commentText: '',
      mid: '',
    })
  },
  //点击评论框不隐藏输入框
  showComment: function(){
    this.setData({
      hideComment: true
    })
  },
  //键盘输入储存
  bindCommentInput: function(event){
    this.setData({
      commentText: event.detail.value
    })
  },
  //发布评论
  bindComment: function(){
    wx.showLoading({
      title: '评论中',
    })
    commentModel.onComment(this.data.commentText, this.data.mid, [], (res) => {
      var that = this
      let tagList = that.data.tagList
      for (let i in tagList[that.data.now].list) {
        if (tagList[this.data.now].list[i].id == that.data.mid) {
          tagList[that.data.now].list[i].sum_reply += 1
          that.setData({
            tagList: tagList
          })
        }
      }
      this.setData({
        hideComment: false,
        commentText: '',
        mid: '',
      })
      wx.hideLoading()
      wx.showToast({
        title: '',
      })
    })
  },
  //筛选单项选择器方法
  radioChange: function(event){
    let value = event.detail.value
    value = '#' + value 
    let tagList = this.data.tagList
    console.log(value)
    infoModule.getMessageByTag(value, 1, (res) => {
      console.log(res.data)
      tagList[0].list = res.data
      tagList[0].page = 2
      this.setData({
        tag: value,
        tagList: tagList
      })
    })
  },
  //隐藏单项选择器
  onHidden: function(event){
    this.setData({
      radioHidden: false
    })
  },
  //显示单项选择器
  screenShow:function(event){
    this.setData({
      radioHidden: true
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


  /**
   * 生命周期函数--监听页面加载
   */

//页面初始化函数
  _init: function() {
    var that = this
    let tagList = [{
      page: 1, hasMore: true, text: '精选', list: []
    }, {
        page: 1, hasMore: true, text: '关注', list: []
      }]
    infoModule.getInfoList(tagList[0].page, (res) => {
      tagList[0].list = res.data
      infoModule.getFollowInfo(tagList[1].page, (res)=> {
        tagList[1].list = res.data
        that.setData({
          tagList: tagList,
          tag: '全部'
        })
        wx.stopPullDownRefresh()
      })
    }, (err)=>{
      console.log(err)
      this.setData({
        hasRequest: false
      })
    })
  },
  bindRetry : function(e){
    this.onLoad()
  },
  //页面滚动监听函数
  onPageScroll: function(e) {
    if (e.scrollTop >= this.data.top){
      let height = this.data.swiperHeight
      this.setData({
        hasScroll: true,
        scrollHeight: height
      })
    }
    else{
      this.setData({
        hasScroll: false,
        scrollHeight: null
      })
    }
  },
  //scroll-view滚动到顶部的触发方法
  upper: function(e){
    this.setData({
      hasScroll: false,
      scrollHeight: null
    })
  },
  //scroll-view滚动到底部的触发方法
  lower: function (e) {
    let height = this.data.swiperHeight
    this.setData({
      hasScroll: true,
      scrollHeight: height
    })
    this.bottomBind()
  },
  //点击分类切换
  onTagBind: function (options) {
    let index = options.target.dataset.index
    this.setData({
      now: index
    })
  },
  //滑动滑块切换Tag
  changeTag: function (options) {
    let num = options.detail.current
    this.setData({
      now: num
    })
  },
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success:function(res){
        that.setData({
          swiperHeight: res.windowHeight - 50
        })
      }
    })
    let couTime = setInterval(function(){
      wx.showLoading({
        title: '初始化',
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
  //跳转tag标签
  onScrollItem: function(e){
    let data = this.data.tagList
    data.map(function(v){v.status=false;})
    data[e.target.dataset.index].status = true
    this.setData({
      tagList: data
    })
  },
  //下拉刷新方法
  bottomBind: function(){
    var that = this
    let tagList = this.data.tagList
    for (let i in tagList) {
      if (this.data.now == i) {
        if (tagList[i].hasMore) {
          let pageNum = tagList[i].page
          pageNum++
          if (this.data.now == 0) {
            infoModule.getInfoList(pageNum, (res) => {
              if (res.data.length != 0) {
                tagList[i].list = tagList[i].list.concat(res.data)
                tagList[i].page = pageNum
              }
              else {
                tagList[i].hasMore = false
              }
            })
          }
          if (this.data.now == 1) {
            if(this.data.tag == '全部'){
              infoModule.getFollowInfo(pageNum, (res) => {
                if (res.data.length != 0) {
                  tagList[i].list = tagList[i].list.concat(res.data)
                  tagList[i].page = pageNum
                }
                else {
                  tagList[i].hasMore = false
                }
              })
            }
            else{
              infoModule.getMessageByTag(this.data.tag, pageNum, (res) => {
                if (res.data.length != 0) {
                  tagList[i].list = tagList[i].list.concat(res.data)
                  tagList[i].page = pageNum
                }
                else {
                  tagList[i].hasMore = false
                }
              })
            }
          }
          that.setData({
            tagList: tagList
          })
        }
        else {
          console.log('已经到头了')
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    let q = wx.createSelectorQuery()
    q.select('.classify-box').boundingClientRect()
    q.exec(function (res) {
      that.setData({
        top: res[0].top - 50
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('show')
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
    // this.bottomBind()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})