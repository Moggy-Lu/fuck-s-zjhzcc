import { config } from '../config.js'

class HTTP {
  constructor(){
    this.base_url = config.api_blink_url
  }
  request(params){
    if(!params.method){
      params.method = 'GET'
    }
    var that = this
    var url = this.base_url + params.url
    var token = wx.getStorageSync('token')
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token': token
      },
      method: params.method,
      success: function(res) {
        let code = res.statusCode.toString()
        let starCode = code.charAt(0)
        if(starCode == '2'){
          params.success && params.success(res.data)
        }
        else{
          params.fail && params.fail(res)
        }
      },
      fail: function(err) {
        params.fail && params.fail(err)
      },
      complete: function(res) {
        params.complete && params.complete(res)
      },
    })
  }
}
export {HTTP}