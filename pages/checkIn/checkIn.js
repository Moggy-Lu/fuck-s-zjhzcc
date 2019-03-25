// pages/checkIn/checkIn.js
import { ActiveModel } from '../../models/active.js'
import { ReleaseModel } from '../../models/release.js';
var releaseModule = new ReleaseModel()
var activeModel = new ActiveModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeList:[],
    page: 1,
    createShow: false,
    hasAdd: true, //是否显示添加图片icon
    img:'',
    hasText:{
      first: '',
      second: '',
      third: '',
      status: false,
      qrCodeUrl: '',
    },
    activeText:'',
  },
  //添加海报并显示在界面上
  addImg:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        that.setData({
          img: res.tempFilePaths[0].toString(),
          hasAdd: false,
        })
      },
    })
  },
  //跳转到创建新活动页面
  showCreateActive:function(){
    wx.navigateTo({
      url: '../createActive/createActive',
    })
  },
  onMyActive: function () {
    wx.navigateTo({
      url: '../myActive/myActive'
    })
  },
  //打开相机扫二维码
  addActiveBind: function () {
    wx.scanCode({
      success(res) {
        activeModel.onQrCodeUrl(res.result, (res)=>{
          console.log(res)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    activeModel.onAllActive(this.data.page, (res)=>{
      this.setData({
        activeList:res.data
      })
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
    this.setData({
      activeList: [],
      page: 1,
      createShow: false,
      hasAdd: true, //是否显示添加图片icon
      img: '',
      hasText: false,
      activeText: '',
    })
    this.onLoad()
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