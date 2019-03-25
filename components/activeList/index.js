// components/activeList/index.js
import { ActiveModel } from '../../models/active.js'
var activeModel = new ActiveModel()
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
    let active = this.properties.activeData
    //切换活动的时间表示方式
    let datetime = new Date(active.startup_time*1000)
    datetime = 1900 + datetime.getYear() + '-' + datetime.getMonth() + 1 + '-' + datetime.getDate() + ' ' + datetime.getHours() + ':' + datetime.getMinutes()
    active.startup_time = datetime
    let tag = active.e_type
    active.e_type = tag.trim().split(" ")
    this.setData({
      activeData : active
    })
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
    },
    //参加活动
    joinActiveBind: function(){
      let eid = this.data.activeData.id
      activeModel.joinActive(eid, (res)=>{
        console.log(res)
      })
    }
  }
})
