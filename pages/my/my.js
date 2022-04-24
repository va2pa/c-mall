// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onMyCoupon(){
    wx.navigateTo({
      url: "/pages/my-coupon/my-coupon"
    })
  },

  onMyFavor(){
    wx.navigateTo({
      url: "/pages/my-favor/my-favor"
    })
  },

  onMyOrder(){
    wx.navigateTo({
      url: "/pages/my-order/my-order?status=0"
     })
  },
})