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
      status: false
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
  //实时获取活动名称字段
  bindInputFirst:function(e){
    let data = this.data.hasText
    data.first = e.detail.value
    if(data.first && data.second && data.third){
      data.status = true
    }
    this.setData({
      hasText: data
    })
  },
  bindInputSecond: function (e) {
    let data = this.data.hasText
    data.second = e.detail.value
    if (data.first && data.second && data.third) {
      data.status = true
    }
    this.setData({
      hasText: data
    })
  },
  bindInputThird: function (e) {
    let data = this.data.hasText
    data.third = e.detail.value
    if (data.first && data.second && data.third) {
      data.status = true
    }
    this.setData({
      hasText: data
    })
  },
  //提交表单
  formSubmit(e){
    var that = this
    wx.showLoading({
      title: '上传中',
    })
    let imgUrl = this.data.img
    wx.uploadFile({
      url: 'http://47.102.108.60/api/v1/message/uploadImages',
      filePath: imgUrl,
      name: 'file',
      success: (res) => {
        let url = JSON.parse(res.data).msg
        let code = res.statusCode.toString()
        let starCode = code.charAt(0)
        if (starCode == '2') {
          let data = e.detail.value
          let type = data.type ? data.type : "default"
          let address = data.address ? data.address : "未知"
          let params = {
            name: data.activeName,
            type: type,
            address: address,
            group: data.admin,
            registerStart_time: 0,
            registerEnd_time: 0,
            startUp_time: data.checkTime,
            end_time: "",
            status: 0,
            prepare_num: 0,
            actual_num: 0,
            remark: data.remark,
            image:  url,
          }
          activeModel.createNewActive(params, (res) => {
            wx.hideLoading()
            wx.showToast({
              title: '发布成功',
            })
            this.onPullDownRefresh()
          })
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  //跳转到创建新活动页面
  showCreateActive:function(){
    this.setData({
      createShow:!this.data.createShow
    })
    //动态效果
    // var animation = wx.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'ease',
    //   delay: 1000
    // })
    // animation.scaleY(0.1).step()
    // this.setData({
    //   animationData: animation.export()
    // })
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
        console.log(res)
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