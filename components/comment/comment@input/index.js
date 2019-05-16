// components/comment/comment@input/index.js
import { CommentModel } from '../../../models/comment.js';
var commentModel = new CommentModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    belongto: Number, //回复的主评论ID或者文章ID
    type: Number, //true是回复评论，fasle是回复文章
    show: Boolean,
    name: String,
    uid_from: {
      type: Number,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commentText: '',
    commentImg: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏评论框
    onCommentHidden: function (event) {
      this.setData({
        show: false,
        type: false
      })
    },
    //显示评论框
    onShowComment: function () {
      this.setData({
        show: true
      })
    },
    //防止冒泡的方法
    inBtn: function (event) {
      console.log('inBtn')
    },
    //发送评论
    onComment: function () {
      wx.showLoading({
        title: '评论中',
      })
      var that = this
      if (this.data.commentText != '') {
        if (this.data.type) {
          commentModel.onCommentToCom(
            this.data.commentText,
            this.data.belongto,
            this.data.commentImg,
            this.data.uid_from, (res) => {
              that.setData({
                commentText: ''
              })
              wx.hideLoading()
              wx.showToast({
                title: '',
              })
              this.triggerEvent('comment', {
                comment: true
              }, {})
            })
        }
        else {
          commentModel.onComment(this.data.commentText, this.data.belongto, this.data.commentImg, (res) => {
            that.setData({
              commentText: ''
            })
            wx.hideLoading()
            wx.showToast({
              title: '',
            })
            this.triggerEvent('comment', {
              comment: true
            }, {})
          })
        }
        //清空输入框
        this.setData({
          inputValue: null,
          show: false
        })
      }
    },
    //保存键盘输入
    bindCommentInput: function (event) {
      this.setData({
        commentText: event.detail.value
      })
    },
  }
})
