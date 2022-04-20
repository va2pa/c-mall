import { Cart } from "./model/cart"

// app.js
App({
  onLaunch() {
    const cart = new Cart()
    if (!cart.isEmpty()) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }

    // const token = new Token()
    // token.verify()

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
