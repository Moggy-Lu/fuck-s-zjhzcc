// pages/release/release.js
import { ReleaseModel } from '../../models/release.js';
var releaseModule = new ReleaseModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    update_img_urlList  :[],
    imageNumber         :9,
    textareaText        :"",
    inputValue          :"",
    success_imgsList    :[],
    tagList: ['#兼职', '#求助', '#失物招领', '#推广'],
    hasTag: '',
  },
  //添加tag
  addTag: function(e){
    let index = e.target.dataset.index
    let tag = this.data.tagList[index]
    let tagList = this.data.tagList
    tagList.splice(index, 1)
    this.setData({
      hasTag: tag,
      tagList: tagList
    })
    
  },
  //删除tag
  deleteTag: function(e){
    let tagList = this.data.tagList
    tagList.push(this.data.hasTag)
    this.setData({
      tagList: tagList,
      hasTag: ''
    })
  },
  //删除图片
  catchDeleteOn:function(e){
    let index = e.currentTarget.dataset.index
    this.data.update_img_urlList.splice(index, 1)
    let num = this.data.imageNumber+1
    this.setData({
      update_img_urlList: this.data.update_img_urlList,
      imageNumber:num
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
    if (this.data.textareaText){
      let imgs = this.data.update_img_urlList
      let updata = {
        text: this.data.textareaText,
        tag: this.data.hasTag?this.data.hasTag:'无',
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
    // this.getTabBar().show(1)
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