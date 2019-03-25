// pages/bindClassic/bindClassic.js
import { ScheduleModel } from '../../models/classSchedule.js';
var scheduleModel = new ScheduleModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面标题
    wx.setNavigationBarTitle({
      title: '绑定教务信息'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //提交表单
  formSubmit(e){
    let value = e.detail.value
    if(value.number && value.password){
      wx.showLoading({
        title: '绑定中',
      })
      scheduleModel.bindSchool(value.number, value.password, (res)=>{
        wx.hideLoading()
        wx.showToast({
          title: '绑定成功',
        })
        wx.redirectTo({
          url: '../classSchedule/classSchedule'
        })
      }, (err)=>{
        wx.showToast({
          title: '账号或密码错误',
          icon: 'none'
        })
      })
    }
    else{
      wx.showToast({
        title: '请填写完整',
        icon: 'none'
      })
    }
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