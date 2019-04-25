import { HTTP } from '../utils/http.js'

class UserModel extends HTTP {
  constructor() {
    super()
  }
  //删除自己的动态
  deleteMessage(id, sCallBack){
    this.request({
      url:'/message/deleteMessage',
      data:{
        id: id
      },
      method:'POST',
      success:function(res){
        sCallBack && sCallBack(res)
      }
    })
  }
  //获取自己发布的信息
  getMyMessage(page, sCallBack){
    this.request({
      url:'/message/getMyMessage',
      data:{
        size:8,
        page:page
      },
      success: (res) => {
        sCallBack && sCallBack(res.data)
      }
    })
  }
  //获取自己评论过的子评论
  getMySubReply(sCallBack){
    this.request({
      url: '/message/getMySubReply',
      success: (res) => {
        sCallBack && sCallBack(res.data)
      }
    })
  }
  //关注与取消关注其他用户
  onFollow(data, sCallBack) {
    this.request({
      url: '/user/follow',
      method:'POST',
      data: data,
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
  //获取自己赞过的动态
  getMyLike(page, sCallBack){
    this.request({
      url: '/message/getMyLike',
      success: (res) => {
        sCallBack && sCallBack(res.data)
      }
    })
  }
  //获取通知
  getNotice(sCallBack){
    this.request({
      url: '/user/getNotice',
      // method:'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
  //获取用户信息
  getMyInfo(sCallBack) {
    this.request({
      url: '/user/getMyInfo',
      // method:'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
  //上传昵称和头像
  onuserNickname(nickname, icon, sCallBack, fail){
    this.request({
      url:'/user/updateUserNickname',
      data:{
        nickname: nickname,
        icon: icon
      },
      method: 'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      fail:(err) => {
        fail && fail(err)
      }
    })
  }
  //更新用户信息
  updateUser(student_id, phone, email, address, nickname, icon, bio, sCallBack) {
    this.request({
      url:'/user/updateUserInfo',
      data:{
        student_id:student_id,
        phone:phone,
        email:email,
        address:address,
        nickname:nickname,
        icon:icon,
        bio:bio
      },
      method:'POST',
      success:(res)=>{
        sCallBack&&sCallBack(res)
      }
    })
  }
}
export { UserModel }