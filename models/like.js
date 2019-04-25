import { HTTP } from '../utils/http.js'

class LikeModel extends HTTP {
  constructor() {
    super()
  }
  //点赞或取消点赞
  like(like_or_cancel, id, sCallBack){
    this.request({
      url:"/message/messageLike",
      data:{
        id:id
      },
      method: 'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
  //查看当前用户是否点赞
  getLikeStatus(id ,sCallBack){

  }
  //获取点赞数
  getLikeNumber(mid) {

  }
  //获取最多6个点赞者的头像
  getLikeUser(mid, sCallBack){
    this.request({
      url: '/message/getLiker',
      data : {
        n : 6,
        mid : mid
      }, 
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
}
export { LikeModel }