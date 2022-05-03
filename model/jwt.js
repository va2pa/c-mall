import { config } from "../config/config";
import { promisic } from "../utils/util";

class Jwt {

    static async makeTokenlegal() {
      const token = wx.getStorageSync('token');
      console.log('token====================')
      console.log(token)
      if (!token) {
          await Jwt.getTokenFromServer()
      } else {
          await Jwt.verifyByServer(token)
      }
  }


  static async getTokenFromServer() {
      const { code } = await wx.login();
      const res = await promisic(wx.request)({
          url: `${config.apiBaseUrl}token/login`,
          method: 'POST',
          data: {
              code: code
          }
      });
      wx.setStorageSync('token', res.data.token);
      return res.data.token
  }

  static async verifyByServer(token) {
      const res = await promisic(wx.request)({
          url: `${config.apiBaseUrl}token/verify`,
          method: 'POST',
          data: {
              token: token
          }
      });
      const valid = res.data.is_valid
      if (!valid) {
          return Jwt.getTokenFromServer()
      }
  }

}
export {
  Jwt
}