import { HTTP } from '../utils/http.js'

class ArticleModel extends HTTP {
  constructor() {
    super()
  }
  //根据mid获取文章详情
  getArticleDetail(mid, sCallBack) {
    this.request({
      url: '/message/getMessageInfo',
      data: {
        mid: mid
      },
      success: (res) => {
        sCallBack && sCallBack(res)
      }
    })
  }
}
export { ArticleModel }