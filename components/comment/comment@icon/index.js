// components/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mid:Number,
    count:Number,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    oncomment: function(event) {
      wx.navigateTo({
        url: '/pages/articleDetail/articleDetail?focus=true&&id='+this.properties.mid,
      })
    }
  }
})
