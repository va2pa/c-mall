import {config} from '../config/config';
import { Jwt } from '../model/jwt';
import {promisic} from '../utils/util'

class Http{
  static async request({url, data, method='GET', throwError=false,noResend=false}){
    let res;
    try{
      res = await promisic(wx.request)({
        url: `${config.apiBaseUrl}${url}`,
        method,
        data,
        header: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${wx.getStorageSync('token')}`
        }
      });
    }catch(e){
      Http.showError("网络异常");
      return;
    }

    const code = res.statusCode.toString()
    if (code.startsWith('2')) {
      return res.data;
    } else {
      if (code === '401') {
        if (!noResend) {
            return await Http._resend({
                url,
                data,
                method,
                throwError
            })
        }
      }else{
        if(throwError){
          throw {errorCode : res.data.code,
                statusCode : code,
                message : res.data.message};
        }else{
          Http.showError(res.data.message);
        }
        
      }
    }
    return res.data
  }

  static showError(errorMsg) {
    
    wx.showToast({
        icon: "none",
        title: errorMsg,
        duration: 2500
    })
  }

  static async _resend(data) {
    data.noResend = true;
    await Jwt.getTokenFromServer();
    return await Http.request(data)
  }
}

export{
  Http
}