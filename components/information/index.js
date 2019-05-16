// components/information/index.js
import { LikeModel } from '../../models/like.js'
import {Util} from '../../utils/util.js'
import { UserModel } from '../../models/user.js'
var userModel = new UserModel()
let util = new Util()
let likeModel = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoItem: Object,
    like: Boolean,
    hasMe: {
      type: Boolean,
      value: false,
      superHighIMg: false //超长图标志位
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:'',
    hasBig: false,
    hasfit: null, //是长图还是宽图
  },

/**
   * 组件的生命周期函数
   */
  lifetimes: {
    ready() {
      let time = util.getDate(this.properties.infoItem.create_time)
      if (this.properties.infoItem.imgs&&this.properties.infoItem.imgs.length == 1){
        this.setData({
          hasBig:true
        })
      }
      this.setData({
        time: time
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //删除自己的信息
    onDeleteInfo: function() {
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否删除这条动态',
        success(res) {
          if (res.confirm) {
            let id = that.data.infoItem.id
            userModel.deleteMessage(id, (res) => {
              that.triggerEvent('delete', {
                hasDelete: true
              }, {})
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    //关注与取消关注
    onFollowUser: function(event) {
      let data = { follow: this.data.infoItem.uid}
      userModel.onFollow(data, (res)=>{
        let follow = !this.data.infoItem.follow
        let uid = this.data.infoItem.uid
        this.triggerEvent('follow', [{
          follow: follow
        },{uid: uid}], {})
      })
    },
    //评论
    onComment: function(event){
      var that = this
      this.triggerEvent('comment', {
        mid: that.data.infoItem.id,
        nickname: that.data.infoItem.nickname
      }, {})
    },
    //点赞
    onLike: function (event) {
      let like_or_cancel = event.detail.behavior
      likeModel.like(like_or_cancel, this.data.infoItem.id, (res)=>{
        this.setData({
          like: !this.data.like
        })
      })
    },
    //获取图片原始宽和高
    imageLoad: function (e) {
      if(e.detail.width > e.detail.height){
        this.setData({
          hasfit:false
        })
      }
      if (e.detail.width <= e.detail.height) {
        this.setData({
          hasfit: true
        })
      }
      if (e.detail.width*2.5 <= e.detail.height){
        this.setData({
          superHighIMg: true
        })
      }
    },
    clickInfo: function(event) {
      wx.navigateTo({
        url: '../../pages/articleDetail/articleDetail?id='+this.data.infoItem.id+'&like='+this.data.like
      })
    },
    //点击头像查看他人主页
    clickUser: function(event) {
      let uid = this.data.infoItem.uid
      let follow  = this.data.infoItem.follow
      wx.navigateTo({
        url: '../../pages/otherHome/otherHome?follow=' + follow + '&&uid=' + uid
      })
    },
    clickAction: function(event) {

    },
    //点击图片预览
    previewImg: function (e) {
      let index = e.currentTarget.dataset.index;
      console.log(index)
      let imgArr = []
      for(let item in this.data.infoItem.imgs){
        imgArr.push(this.data.infoItem.imgs[item].url)
      }
      wx.previewImage({
        current: imgArr[index],     //当前图片地址
        urls: imgArr,               //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})
