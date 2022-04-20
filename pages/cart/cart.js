import { Cart } from "../../model/cart"

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cart = new Cart();
    const cartItems = cart.getCartData().items
    if (cart.isEmpty()) {
        this.processEmpty()
        return
    }
    this.processNotEmpty();
    this.setData({
        cartItems
    })
  },

  processEmpty(){
    this.setData({
      empty: true
    })
    // 隐藏小红点
    wx.hideTabBarRedDot({
      index: 2,
    })
  },
  processNotEmpty() {
    this.setData({
        empty: false
    })
    wx.showTabBarRedDot({
        index: 2,
    })
  },
  onEmptyCart(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})