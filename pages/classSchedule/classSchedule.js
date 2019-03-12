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
    dateList: [
      {
        num:1,
        week:'一'
      },
      {
        num: 2,
        week: '二'
      },
      {
        num: 3,
        week: '三'
      },
      {
        num: 4,
        week: '四'
      },
      {
        num: 5,
        week: '五'
      },
      {
        num: 6,
        week: '六'
      },
      {
        num: 0,
        week: '日'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date().getDay()
    this.setData({
      now : now
    })
    //页面标题
    wx.setNavigationBarTitle({
      title: '课表查询'
    })
    scheduleModel.getClass((res)=>{
      let schedule = Object.keys(res).map(function(e){return res[e]})
      let week = Object.keys(schedule[now]).map(function (e) { return schedule[now][e]})
      this.setData({
        schedule: schedule,
        week : week
      })
    })
  },
  //点击日期切换
  onWeekBind : function(options){
    var that = this
    let index = options.target.dataset.index == 6 ? 0 : options.target.dataset.index+1
    this.setData({
      now: index
    })
    let week = Object.keys(that.data.schedule[index]).map(function (e) { return that.data.schedule[index][e] })
    this.setData({
      week: week
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