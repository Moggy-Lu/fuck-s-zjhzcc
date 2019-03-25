// pages/createActive/createActive.js
import { ActiveModel } from '../../models/active.js'
import { ReleaseModel } from '../../models/release.js';
var releaseModule = new ReleaseModel()
var activeModel = new ActiveModel()
Page({
  //提交表单
  formSubmit(e) {
    let value = e.detail.value
    if(value.name && value.group && value.address && this.data.date && this.data.time){
      wx.showLoading({
        title: '上传中',
      })
      let imgUrl = this.data.img
      let d = this.data.date + ' ' + this.data.time
      let datetime = Number(new Date(d))/1000
      if(imgUrl){
        wx.uploadFile({
          url: 'https://tp5.zjhzcc.club/api/v1/message/uploadImages',
          filePath: imgUrl,
          name: 'file',
          success: (res) => {
            this.releaseForm(res, value, datetime)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
      else{
        this.releaseForm('', value, datetime)
      }
      
    }
    else{
      wx.showToast({
        title: '请填全基本信息',
        icon: 'none'
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    hasAdd: true, //是否显示添加图片icon
    img: '',
    date: '',
    time: '',
    defaultPosterImg:'https://picture.zjhzcc.club//c7ed2276f1b65ee8825343e1b49d2d.png',
  },
  //发布活动
  releaseForm: function(res, value, datetime){
    if(res){
      var url = JSON.parse(res.data).msg
      var code = res.statusCode.toString()
      var starCode = code.charAt(0)
    }
    if (!res || starCode == '2') {
      let params = {
        name: value.name,
        type: value.tag?value.tag:'活动',
        address: value.address,
        group: value.group,
        registerStart_time: 0,
        registerEnd_time: 0,
        startUp_time: datetime,
        end_time: datetime,
        status: 0,
        prepare_num: 0,
        actual_num: 0,
        remark: value.introduce?value.introduce:'无',
        image: res ? url : this.data.defaultPosterImg,
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

  //添加海报并显示在界面上
  addImg: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          img: res.tempFilePaths[0].toString(),
          hasAdd: false,
        })
      },
    })
  },
  //选择日期
  bindDateChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  //选择时间
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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