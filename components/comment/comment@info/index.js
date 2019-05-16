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
      subreplyNumber: this.properties.commentData.subreply.data.length,
    })
    if(this.properties.commentData.subreply.data.length == 0){
      this.setData({
        isSubreply:false
      })
    }
    else if (this.properties.commentData.subreply.data.length > 1){
      this.setData({
        hiddenMore: true
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time:'',
    isSubreply: true,
    hiddenMore: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMore(){
      this.setData({
        hiddenMore: false,
      })
    },
    //点击主评论
    commentToInfo: function(options){
      let name = options.currentTarget.dataset.name
      let uidfrom = options.currentTarget.dataset.uidfrom
      let belongto = options.currentTarget.dataset.belongto
      this.triggerEvent('comTo', {
        name: name,
        uidfrom: uidfrom,
        belongto: belongto,
      }, {})
    },
    //点击子评论
    commentToCom:function(options){
      if (!this.data.hiddenMore){
        let name = options.currentTarget.dataset.name
        let uidfrom = options.currentTarget.dataset.uidfrom
        let belongto = options.currentTarget.dataset.belongto
        this.triggerEvent('comTo', {
          name: name,
          uidfrom: uidfrom,
          belongto: belongto,
        }, {})
      }
    }
  }
})
