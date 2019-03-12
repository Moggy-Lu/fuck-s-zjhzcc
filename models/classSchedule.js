import { HTTP } from '../utils/http.js'

class ScheduleModel extends HTTP {
  constructor() {
    super()
  }
  bindSchool(account, password, sCallBack, complete) {
    this.request({
      url: '/user/bindSchool',
      data: {
        'account': account,
        "password": password
      },
      method:'POST',
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
  getClass(sCallBack, complete) {
    this.request({
      url: '/school/getClass',
      success: (res) => {
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      }
    })
  }
}
export { ScheduleModel }