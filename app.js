import { Cart } from "./model/cart"
import { Jwt } from "./model/jwt"

// app.js
App({
  onLaunch() {
    const cart = new Cart()
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
    const jwt = new Jwt();
    jwt.makeTokenlegal();
    // const token = new Token()
    // token.verify()

    // 登录
    // wx.login({
      // success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      // }
    // })
  }
})
