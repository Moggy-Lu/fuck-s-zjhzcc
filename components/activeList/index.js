// components/activeList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeData:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    poster: '',
  },
  ready(){
    console.log(this.properties.activeData)
    if(this.properties.activeData.image){
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onActiveDetail: function(){
      let active = JSON.stringify(this.data.activeData)
      wx.navigateTo({
        url: '../../pages/activeDetail/activeDetail?activeData='+active
      })
    }
  }
})
