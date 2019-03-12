// components/information/index.js
import { LikeModel } from '../../models/like.js'
import {Util} from '../../utils/util.js'
let util = new Util()
let likeModel = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infoItem: Object,
    like: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:'',
    hasBig: false,
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
        like: this.properties.infoItem.liked,
        time: time
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      let like_or_cancel = event.detail.behavior
      likeModel.like(like_or_cancel, this.data.infoItem.id, (res)=>{
        console.log(res)
      })
    },
    clickInfo: function(event) {
      wx.navigateTo({
        url: '../../pages/articleDetail/articleDetail?focus=false&&id='+this.data.infoItem.id+'&&like='+this.data.like
      })
    },
    clickUser: function(event) {
      console.log('点击头像')
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
