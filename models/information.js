import { HTTP } from '../utils/http.js'

class InfoModel extends HTTP{
  constructor(){
    super()
  }
  //获取动态列表
  getInfoList(page, sCallBack, fail, complete) {
    this.request({
      url: '/message/getMessage',
      data: {
        'page': page,
        "size":8
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete&&complete(res)
      },
      fail: (err) => {
        fail && fail(err)
      }
    })
  }
  //获取动态列表
  getMessageByTag(tag, page, sCallBack, fail, complete) {
    this.request({
      url: '/message/getMessage',
      data: {
        'page': page,
        "size": 8,
        'tag': tag,
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      },
      fail: (err) => {
        fail && fail(err)
      }
    })
  }
  //获取他人动态
  getMessageByUid(page, uid, sCallBack, fail, complete){
    this.request({
      url: '/message/getMessageByUid',
      data: {
        'page': page,
        "size": 8,
        "uid": uid,
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      },
      fail: (err) => {
        fail && fail(err)
      }
    })
  }
  //获取关注的用户的动态列表
  getFollowInfo(page, sCallBack, fail, complete) {
    this.request({
      url: '/message/getMessageByFollow',
      data: {
        'page': page,
        "size": 8
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      },
      fail: (err) => {
        fail && fail(err)
      }
    })
  }
}
export { InfoModel}