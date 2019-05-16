// pages/articleDetail/articleDetail.js
import {CommentModel} from '../../models/comment.js';
import { ArticleModel } from '../../models/articleDetail.js';
import { Util } from '../../utils/util.js';
import { LikeModel } from '../../models/like.js'
let likeModel = new LikeModel()
let util = new Util()
var commentModel = new CommentModel()
var articleModel = new ArticleModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    belongto: 0,
    articleData: {},
    userFilling : '../../imgs/icon/user-filling.png',
    commentList : {},
    mid: 0,
    time:'',
    hasMoreData:true, 
    page:1, 
    now: 0, //当前页面
    commentShow: false, //是否显示评论框
    liked: false,

    },
  //点击头像查看他人主页
  clickUser: function (event) {
    let uid = this.data.articleData.uid
    let follow = this.data.articleData.follow
    wx.navigateTo({
      url: '../../pages/otherHome/otherHome?follow=' + follow + '&&uid=' + uid
    })
  },
  //切换tag
  onClickTag: function(option){
    let index = option.currentTarget.dataset.index
    this.setData({
      now: index,
      comType: false
    })
  },
    //点赞
  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.articleData.id, (res) => {
      console.log(res)
    })
  },
  //发送评论的回执函数
  bindComment: function(){
    commentModel.getCommentList(this.data.page, this.data.mid, (res) => {
      let list = res.data
      this.setData({
        commentList: list
      })
    })
  },
  //点击评论icon评论文章
  onShowComment: function() {
    let name = this.data.articleData.nikename
    let belongto = this.data.articleData.id
    this.setData({
      belongto: belongto,
      comType: false,
      commentUser: name,
      commentShow: true,
    })
  },
    //点击评论回执函数
  catchCommentOn: function (event) {
    let name = event.detail.name
    let uidfrom = event.detail.uidfrom
    let belongto = event.detail.belongto
    this.setData({
      belongto: belongto,
      comType:true,
      uidfrom: uidfrom,
      commentUser: name,
      commentShow: true, 
    })
  },
    
  //点击图片预览
  previewImg: function (e) {
    let index = e.currentTarget.dataset.index;
    let imgArr = []
    for (let item in this.data.articleData.imgs) {
      imgArr.push(this.data.articleData.imgs[item].url)
    }
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mid: options.id,
      liked: JSON.parse(options.like)
    })
    //获取文章详情
    articleModel.getArticleDetail(this.data.mid, (res)=>{
      //获取发布时间
      let time = util.getDate(res.create_time)
      this.setData({
        articleData:res,
        time:time,
        commentUser: res.nikename
      })
    })
  //获取评论列表
  commentModel.getCommentList(this.data.page, this.data.mid, (res)=>{
    let list = res.data
    this.setData({
      commentList: list
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      let pageNum = this.data.page
      pageNum++
      commentModel.getCommentList(pageNum, 
        this.data.mid, 
        (res) => {
          if (res.data.length != 0) {
            let data = this.data.commentList.concat(res.data)
            this.setData({
              commentList: data,
              page: pageNum
            })
          }
          else {
            this.setData({
              hasMoreData: false
            })
          }
        })
    }
    else {
      console.log('已经到头了')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})