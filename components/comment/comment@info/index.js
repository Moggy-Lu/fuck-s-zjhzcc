// components/comment/comment@info/index.js
import { Util } from '../../../utils/util.js'
let util = new Util()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentData:Object,
  },
  _init(){

  },
  ready() {
    let time = util.getDate(this.properties.commentData.create_time)
    this.setData({
      time: time,
    })
    // console.log(this.properties.commentData)
    if(this.properties.commentData.subreply.data.length == 0){
      this.setData({
        isSubreply:false
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:'',
    isSubreply: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
