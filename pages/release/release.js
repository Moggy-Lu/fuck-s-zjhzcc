// pages/release/release.js
import { ReleaseModel } from '../../models/release.js';
var releaseModule = new ReleaseModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    update_img_urlList  :[],
    hidden              :true,
    imageNumber         :9,
    textareaText        :"",
    inputValue          :"",
    success_imgsList    :[]
  },
  //删除图片
  catchDeleteOn:function(e){
    let index = e.currentTarget.dataset.index
    this.data.update_img_urlList.splice(index, 1)
    this.setData({
      update_img_urlList: this.data.update_img_urlList,
      imageNumber:this.imageNumber++
    })
  },
  //获取动态的文字
  bindTextAreaBlur: function(e){
    this.setData({
      textareaText: e.detail.value
    })
  },
  //添加图片并显示在页面上
  chooseImages: function(){
    var that = this
    wx.chooseImage({
      count: that.data.imageNumber,
      
      success: function(res) {
        let num = res.tempFilePaths.length
        that.setData({
          imageNumber : that.data.imageNumber - num
        })
        if (that.data.imageNumber == 0){
          that.setData({
            hidden : false
          })
        }
        else {
          that.setData({
            hidden: true
          })
        }
        let url = that.data.update_img_urlList
        for (let u in res.tempFilePaths){
          url.push(res.tempFilePaths[u])
        }
        that.setData({
          update_img_urlList : url
        })
      },
    })
  },
  //发布动态
  updateRelease: function(){
    if (this.data.textareaText != ""){
      let imgs = this.data.update_img_urlList
      let updata = {
        text: this.data.textareaText,
        tag: '1',
        address: '2',
        imgUrl: imgs
      }
      wx.showLoading({
        title: '上传中',
      })
      releaseModule.updataRelease(updata, (res)=>{
        console.log(res)
        wx.hideLoading()
        this.onLoad()
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(function(){
          wx.switchTab({
            url: '../index/index',
          })
        }, 600)
      })
    }
    else {
      wx.showToast({
        title: '写点什么吧',
        icon: 'none'
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imageNumber: 9,
      inputValue: "",
      hidden: true,
      update_img_urlList: [],
      textareaText: ""

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