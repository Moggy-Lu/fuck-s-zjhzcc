// pages/search/search.js
import { InfoModel } from '../../models/information.js'
let infoModule = new InfoModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchString: '', //保存搜索关键词
    infoList: [], //信息流列表
    hasMore: true,
    loadShow: false,  //是否显示加载条
    page: 1,  //当前页数
  },

  //点击取消返回上一界面
  onCancel: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //初始化函数
  _init(){
    this.setData({
      searchString: '',
      infoList: [],
      hasMore: true,
      loadShow: false,
      page: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //键盘输入时触发
  bindKeyCode: function(options){
    let key = options.detail.value
    this.setData({
      searchString: key
    })
    if(this.data.searchString != ''){
      infoModule.getMessageBySearch(1, this.data.searchString, (res) => {
        this.setData({
          infoList: res.data
        })
      })
    }
    else{
      this._init()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //页面标题
    wx.setNavigationBarTitle({
      title: '搜索'
    })
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
    this._init()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loadShow: true
    })
    let page = this.data.page
    infoModule.getMessageBySearch(page+1, this.data.searchString, (res) => {
      if (res.data.length == 0){
        this.setData({
          hasMore: false
        })
        console.log('没有更多了')
      }
      else{
        let list = this.data.infoList.concat(res.data)
        this.setData({
          loadShow: false,
          page: page+1,
          infoList: list
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})