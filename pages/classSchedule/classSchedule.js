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
  //课程信息格式切换
  regClassicInfo: function (message) {
    let week = Object.keys(message).map(function (e) { return message[e] })
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
      let week = this.regClassicInfo(schedule[now])
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
    let week = this.regClassicInfo(that.data.schedule[index])
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