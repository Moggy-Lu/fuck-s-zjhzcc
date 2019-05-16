import { HTTP } from '../utils/http.js'

class InfoModel extends HTTP{
  constructor(){
    super()
  }
  //获取动态列表
  //type字段0代表精选，1代表关注
  getInfoList(type, page, sCallBack, fail, complete) {
    let url = (type == 0) ? '/message/getMessage' : '/message/getMessageByFollow'
    this.request({
      url: url,
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
        "id": uid,
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
  //模糊搜索
  getMessageBySearch(page, text, sCallBack, fail, complete) {
    this.request({
      url: '/message/getMessageBySearch',
      data: {
        'page': page,
        "size": 3,
        "text": text,
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