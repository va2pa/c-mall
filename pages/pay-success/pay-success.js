// pages/pay-success/pay-success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.oid = options.oid;
  },

  gotoOrderDetail(){
    wx.redirectTo({
      url:`/pages/order-detail/order-detail?oid=${this.data.oid}`
    })
  }
})