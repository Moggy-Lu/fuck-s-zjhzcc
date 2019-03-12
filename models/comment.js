import { HTTP } from '../utils/http.js'

class CommentModel extends HTTP {
  constructor() {
    super()
  }
  //获取评论
  getCommentList(page, mid, sCallBack) {
    this.request({
      url: '/message/getReply',
      data: {
        page: page,
        size: 5,
        mid: mid
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
  //发布评论
  onComment(text, mid, imgurl, sCallBack) {
    this.request({
      url: '/message/postReplyToMessage',
      data: {
        text: text,
        msg_id: mid,
        imgUrl: imgurl
      },
      method:'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
  //回复评论
  onCommentToCom(text, belongto, imgUrl, uid, sCallBack) {
    console.log()
    this.request({
      url: '/message/postSubreply',
      data: {
        "text": text,
        "belongto": belongto,
        "imgUrl": [],
        "uid_to":uid,
      },
      method: 'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
}
export { CommentModel }