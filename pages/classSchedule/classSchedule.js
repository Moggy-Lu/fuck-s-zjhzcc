// pages/classSchedule/classSchedule.js
import { ScheduleModel } from '../../models/classSchedule.js';
var scheduleModel = new ScheduleModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedule: null,
    week: null,
    dateList: ['日', '一', '二', '三', '四', '五', '六'],
    hasRequest: true,
  },
  //课程信息格式切换
  regClassicInfo: function (message) {
    let week = Object.keys(message).sort((a,b)=>{
      if (parseInt(a.split(",")[0]) > parseInt(b.split(",")[0])){
        return 1
      }
    }).map(function (e) {
      return message[e]
      })
    let weekList = []
    for (let item in week) {
      if (week[item] != '') {
        let w = week[item]
        let list = []
        for (let i = 0; i < 3; i++) {
          list.push(/(\S*)\|(\S*)/.exec(w)[2])
          w = /(\S*)\|(\S*)/.exec(w)[1]
          if (i == 2) {
            list.push(/\{(\S*)\}/.exec(list[2])[1])
            list.push(w)
            list[2] = /(\S*)\{/.exec(list[2])[1]
          }
        }
        weekList.push(list)
      }
    }
    return weekList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    let now = new Date().getDay()
    this.setData({
      now : now
    })
    //页面标题
    wx.setNavigationBarTitle({
      title: '课表查询'
    })
    scheduleModel.getClass((res)=>{
      let schedule = Object.keys(res).map(function(e){
        return that.regClassicInfo(res[e])
        })
      this.setData({
        schedule: schedule
      })
      wx.hideLoading()
    }, (err)=>{
      console.log(err)
      this.setData({
        hasRequest: false
      })
      wx.hideLoading()
    })
  },
  //网络出错重新加载
  bindRetry: function (e) {
    this.onLoad()
  },
  //点击日期切换
  onWeekBind : function(options){
    var that = this
    let index = options.target.dataset.index
    this.setData({
      now: index
    })
  },
  //滑动滑块切换日期
  changeWeek: function(options){
    let num = options.detail.current
    this.setData({
      now: num
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