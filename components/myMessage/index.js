// components/myMessage/index.js
import { LikeModel } from '../../models/like.js'
import { Util } from '../../utils/util.js'
let util = new Util()
let likeModel = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myMessage: Object,
    like: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: '',
  },
  ready(){
    console.log(this.properties.myMessage)
    let time = util.getDate(this.properties.myMessage.create_time)
    this.setData({
      time: time
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onMessage: function(){
      wx.navigateTo({
        url: '../../pages/articleDetail/articleDetail?focus=false&&id=' + this.data.myMessage.id + '&&like=true'
      })
    }
  }
})
