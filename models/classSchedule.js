import { HTTP } from '../utils/http.js'

class ScheduleModel extends HTTP {
  constructor() {
    super()
  }
  bindSchool(account, password, sCallBack, fail, complete) {
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
      },
      fail: (err) => {
        fail && fail(err)
      }
    })
  }
  //查看用户信息
  checkSchool(sCallBack, fail, complete){
    this.request({
      url: '/user/checkSchool',
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
  getClass(sCallBack, fail, complete) {
    this.request({
      url: '/school/getClass',
      success: (res) => {
        console.log('success')
        sCallBack && sCallBack(res)
      },
      complete: (res) => {
        complete && complete(res)
      },
      fail: (err)=>{
        fail && fail(err)
      }
    })
  }
}
export { ScheduleModel }