import { config } from "../config/config";
import { promisic } from "../utils/util";

class Jwt {

  async makeTokenlegal() {
      const token = wx.getStorageSync('token');
      console.log('token====================')
      console.log(token)
      if (!token) {
          await this.getTokenFromServer()
      } else {
          await this.verifyByServer(token)
      }
  }

  async getTokenFromServer() {
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

  async verifyByServer(token) {
      const res = await promisic(wx.request)({
          url: `${config.apiBaseUrl}token/verify`,
          method: 'POST',
          data: {
              token: token
          }
      });
      const valid = res.data.is_valid
      if (!valid) {
          return this.getTokenFromServer()
      }
  }

}
export {
  Jwt
}