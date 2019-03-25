import { HTTP } from '../utils/http.js'

class ReleaseModel extends HTTP{
  constructor(){
    super()
  }
  //上传图片到服务器
  upDataWxImg(imgUrlList, sCallBack){
    let success_imgs = []
    for (let u in imgUrlList) {
      wx.uploadFile({
        url: 'https://tp5.zjhzcc.club/api/v1/message/uploadImages',
        filePath: imgUrlList[u],
        name: 'file',
        success: (res) => {
          let code = res.statusCode.toString()
          let starCode = code.charAt(0)
          if (starCode=='2'){
            console.log(res)
            sCallBack && sCallBack(res)
          }
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  }
  //上传活动
  updataRelease(data, sCallBack){
    let upImgsList = data.imgUrl
    let length = upImgsList.length
    let successList = []
    if (length == 0){
      this.request({
        url: '/message/postMessage',
        data: data,
        method: 'POST',
        success: (res) => {
          console.log(res)
          sCallBack && sCallBack(res)
        }
      })
    }
    else{
      this.upDataWxImg(upImgsList, (res) => {
        let url = JSON.parse(res.data).msg
        successList.push(url)
        if (successList.length == length) {
          data.imgUrl = successList
          this.request({
            url: '/message/postMessage',
            data: data,
            method: 'POST',
            success: (res) => {
              sCallBack && sCallBack(res)
            }
          })
        }
      })
    }
  }
}
export { ReleaseModel}