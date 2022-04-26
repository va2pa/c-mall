import { Order } from "../../model/order";
import { OrderBO } from "../../model/order-bo"

// pages/order-detail/order-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _options: Object,
    orderId: null,
    showFakePay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.data._options = options;
    this.data.orderId = options.oid;
    const order = await Order.getDetail(this.data.orderId);
    const _order = new OrderBO(order);
    console.log(_order);
    this.setData({
      order: _order
    })
  },
  onPay(event){
    this.setData({
      showFakePay: true
    });
  },

  async onConfirmPay(){
    this.setData({
      showFakePay: false
    });
    await Order.fakePayOrder(this.data.orderId);
    wx.redirectTo({
      url: `/pages/pay-success/pay-success?oid=${this.data.orderId}`,
    });
  },

  onCancelPay(){
    this.setData({
      showFakePay: false
    });
  },


})