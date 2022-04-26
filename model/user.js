import { Http } from "../utils/http"

class User{
  static async registerVip() {
    return await Http.request({
        url: 'user/vip/register',
        method: 'POST',
        throwError: true
    })
  }

  static async checkVip() {
    return await Http.request({
        url: 'user/vip/check',
        throwError: true
    })
  }
}

export{
  User
}