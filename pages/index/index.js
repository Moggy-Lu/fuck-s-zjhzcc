// pages/index/index.js
import { InfoModel} from '../../models/information.js'
let infoModule = new InfoModel()
const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试数据
    itemList : [{
      url : '../../imgs/test/banner@1.png'
    }, {
        url: '../../imgs/test/banner@2.png'
      }, {
        url: '../../imgs/test/banner@3.png'
      }],
      tagList: [{
        status:true,
        text: "热门"
      }, {
          status: false,
          text: "精选"
        }, {
          status: false,
          text: "关注"
        }, {
          status: false,
          text: "兼职"
        }, {
          status: false,
          text: "问答"
        }, {
          status: false,
          text: "拼团"
        }, {
          status: false,
          text: "求助"
        }, {
          status: false,
          text: "吐槽"
        }],
      infoItem: [],
      page:1,
      hasMoreData:true,   //是否有更多的数据
  },
  //跳转到签到页面
  navCheckIn: function(res){
    wx.navigateTo({
      url: '../checkIn/checkIn'
    })
  },
  navScheduleIn: function (res) {
    wx.navigateTo({
      url: '../classSchedule/classSchedule'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */

//页面初始化函数
  _init: function() {
    this.setData({
      page:1,
      hasMoreData:true,
      infoItem:[]
    })
    infoModule.getInfoList(this.data.page, (res) => {
      this.setData({
        infoItem: res.data
      })
    }, (res)=>{
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function (options) {
    let couTime = setInterval(function(){
      wx.showLoading({
        title: '初始化',
      })
      if(app.globalData.over){
        wx.hideLoading()
        clearInterval(couTime)
        if (!app.globalData.authorize) {
          wx.redirectTo({
            url: '../../pages/first/first',
          })
        }
      }
    }, 200)
    this._init()
  },
  //跳转tag标签
  onScrollItem: function(e){
    let data = this.data.tagList
    data.map(function(v){v.status=false;})
    data[e.target.dataset.index].status = true
    this.setData({
      tagList: data
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
    if (!app.globalData.authorize){
      wx.redirectTo({
        url: '../../pages/first/first',
      })
    }
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this._init()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasMoreData){
      let pageNum = this.data.page
      pageNum++
      infoModule.getInfoList(pageNum, (res) => {
        if(res.data.length != 0){
          let data = this.data.infoItem.concat(res.data)
          this.setData({
            infoItem: data,
            page: pageNum
          })
        }
        else{
          this.setData({
            hasMoreData:false
          })
        }
      })
    }
    else{
      console.log('已经到头了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})