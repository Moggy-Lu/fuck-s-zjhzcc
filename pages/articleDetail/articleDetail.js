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
    articleData: {},
    userFilling : '../../imgs/icon/user-filling.png',
    commentList : {},
    commentText: '',
    commentImg: [],
    mid: 0,
    inputFocus:false,
    comType: false,   //回复评论为true，回复文章为false
    mainComment: {},    //保存被评论的主评论信息
    commentUser:'', //要评论的人，默认文章作者
    time:'',
    like:false,
    inputValue:null,    //输入框的值
    hasMoreData:true,  
    page:1, 

    },
    //点赞
  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.articleData.id, (res) => {
      console.log(res)
    })
  },
    //回复评论
  catchCommentOn: function (event) {
    let index = event.currentTarget.dataset['index']
    let comment = this.data.commentList[index]
    // console.log(comment)
    this.setData({
      inputFocus:true,
      comType:true,
      mainComment: comment,
      commentUser: comment.nickname_from, 
    })
  },
    //发送评论
    onComment: function(){
      if(this.data.commentText != ''){
        if(this.data.comType) {
          commentModel.onCommentToCom(
          this.data.commentText, 
          this.data.mainComment.id, 
          this.data.commentImg, 
          this.data.mainComment.uid_from, (res)=>{
            console.log(res)
          })
        }
        else {
          commentModel.onComment(this.data.commentText, this.data.mid, this.data.commentImg, (res) => {
            console.log(res)
          }) 
        }
        //清空输入框
        this.setData({
          inputValue: null
        }) 
        //页面重新加载
        let e = {
          like:this.data.like,
          id:this.data.mid,
          focus: this.data.inputFocus
        }
        this.onLoad(e)      
      }
    },
    //保存键盘输入
    bindCommentInput: function(event){
      this.setData({
        commentText: event.detail.value
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
    console.log('options.like:' + options.like)
    this.setData({
      like:(options.like=='true'?true:false),
      mid: options.id,
      inputFocus:options.focus=='true'?true:false,
    })
    //获取文章详情
    articleModel.getArticleDetail(this.data.mid, (res)=>{
      console.log(res)
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