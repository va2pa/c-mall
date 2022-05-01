import { OrderStatus } from "../../core/enum";
import { Order } from "../../model/order"

// pages/my-order/my-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderPaging: Object,
    orderItems:[],
    empty: false,
    showFakePay: false,
    payOrderId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {

  },
  async onShow(){
    const orderPaging = Order.geMyOrdersUnpaid();
    this.data.orderPaging = orderPaging;
    console.log(orderPaging);
    const orderData = await orderPaging.applyMoreData();
    this.bindItems(orderData);
  },
  async changeTabs(event){
    // *1 将String类型转Number类型
    const status = event.detail.activeKey * 1;
    console.log(status);
    let orderPaging;
    switch (status) {
      case OrderStatus.UNPAID:
        orderPaging = Order.geMyOrdersUnpaid();
        console.log("geMyOrdersUnpaid");

        break;
      case OrderStatus.CANCELED:
        orderPaging = Order.geMyOrdersCanceled();
        break;
      default:
        orderPaging = Order.geMyOrdersByStatus(status);
        console.log("geMyOrdersByStatus");
        break;
    }
    this.data.orderPaging = orderPaging;
    const orderData = await orderPaging.applyMoreData();
    this.bindItems(orderData);

  },
  bindItems(data) {
    this.setData({
        orderItems: data.accumulator,
        empty: data.accumulator.length === 0
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.orderPaging.applyMoreData();
    if(!data){
      return;
    }
    if (data.accumulator.length !== 0) {
      this.bindItems(data);
    }
    if(!data.moreData){
      this.setData({
        loadingType: 'end'
      });
    }
  },
  countdownEnd(){
    this.onShow();
  },

  onPay(event){
    this.data.payOrderId = event.detail.orderId;
    this.setData({
      showFakePay: true
    });
  },
  async onConfirmPay(){
    this.setData({
      showFakePay: false
    });
    await Order.fakePayOrder(this.data.payOrderId);
    wx.navigateTo({
      url: `/pages/pay-success/pay-success?oid=${this.data.payOrderId}`,
    });
  },

  onCancelPay(){
    this.setData({
      showFakePay: false
    });
  },

})