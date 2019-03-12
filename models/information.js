import { HTTP } from '../utils/http.js'

class InfoModel extends HTTP{
  constructor(){
    super()
  }
  getInfoList(page, sCallBack, complete) {
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
      }
    })
  }
}
export { InfoModel}