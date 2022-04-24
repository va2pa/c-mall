import { CouponOperate, ShoppingWay } from "../../core/enum"
import { Cart } from "../../model/cart"
import { Sku } from "../../model/sku";
import { OrderItem } from "../../model/order-item";
import { Order } from "../../model/order";
import { Coupon } from "../../model/coupon";

const cart = new Cart();
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingWay: 'buy',
    selectedCouponId: null,
    discountMoney: 0,
    showCouponList: false,
    address: null,
    submitDisable: false,
    addressEmpty: false,
    totalPrice: 0,
    finalTotalPrice: 0,
    showFakePay: false,
    orderId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let orderItems;
    let itemCount;
    this.data.shoppingWay = options.way;
    console.log(this.data.shoppingWay);

    // if (shoppingWay === ShoppingWay.BUY) {
    //     const skuId = options.sku_id
    //     const count = options.count
    //     orderItems = await this.getSingleOrderItems(skuId, count)
    //     localItemCount = 1
    // } else {
        const skuIds = cart.getCheckedSkuIds()
        orderItems = await this.getCartOrderItems(skuIds)
        itemCount = skuIds.length
    // }

    const order = new Order(orderItems, itemCount);
    this.data.order = order;
    const totalPrice = order.getTotalPrice();
    const availableCoupons = await Coupon.getAvailableWithCategory();
    const coupons = this.converToModelCoupons(availableCoupons, order);
        this.setData({
            orderItems,
            totalPrice,
            coupons,
            finalTotalPrice: totalPrice
        })
  },
  async getCartOrderItems(skuIds) {
    const serverSkuList = await Sku.getSkuByIds(skuIds);
    const orderItems = serverSkuList.map((sku) => {
      const count = cart.getCountBySkuId(sku.id)
      return new OrderItem(sku, count)
    })
    return orderItems;
  },

  converToModelCoupons(coupons, order) {
    return coupons.map(c => {
        const coupon = new Coupon(c);
        coupon.satisfyUse(order);
        return coupon
    });
  },
  onShowCoupon(){
    this.setData({
      showCouponList: true
    });
  },
  async onSubmit(event) {

    if (!this.data.address) {
        this.setData({
          addressEmpty: true
        });
        return
    }
    this.disableSubmitBtn()
    const orderId = await this.placeOrder({
      total_price: this.data.totalPrice,
      final_total_price: this.data.finalTotalPrice,
      coupon_id: this.data.selectedCouponId,
      sku_info_list: this.data.order.getOrderSkuInfoList(),
      address: this.packageAddress(this.data.address)
    });
    if (!orderId) {
        // 下单失败，可调整后重新点击下单
        this.enableSubmitBtn();
        return
    }
    this.data.orderId = orderId;
    if (this.data.shoppingWay === ShoppingWay.CART) {
      cart.removeCheckedItems();
    }
    // 订单生成成功，接下来处理支付
    // 显示模拟支付弹窗
    this.setData({
      showFakePay: true
    });
  },

  onConfirmPay(){
    console.log(this.data.orderId);
    Order.fakePayOrder(this.data.orderId);
    wx.redirectTo({
      url: `/pages/pay-success/pay-success?oid=${this.data.orderId}`,
    });
  },

  onCancelPay(){
    wx.redirectTo({
      url: `/pages/my-order/my-order?status=${1}`,
    });
  },

  async placeOrder(orderPost) {
    const orderData = await Order.placeOrder(orderPost);
    if (orderData) {
        return orderData.id
    }
  },
  packageAddress(address){
    return {
      user_name: address.userName,
      mobile: address.telNumber,
      national_code: address.nationalCode,
      city: address.cityName,
      province: address.provinceName,
      postal_code: address.postalCode,
      county: address.countyName,
      detail: address.detailInfo,
    }
  },
  disableSubmitBtn() {
    this.setData({
        submitDisable: true
    })
  },
  enableSubmitBtn() {
      this.setData({
          submitDisable: false
      })
  },
  onChooseAddress(event) {
    const address = event.detail.address;
    this.data.address = address;
    this.data.addressEmpty = false;
  },
  onChooseCoupon(event) {
    const couponData = event.detail.coupon
    const operate = event.detail.operate
    if (operate === CouponOperate.SELECT) {
        this.data.selectedCouponId = couponData.id
        const priceObj = Coupon.getFinalTotalPrice(this.data.order.getTotalPrice(), couponData)

        this.setData({
            finalTotalPrice: priceObj.finalPrice,
            discountMoney: priceObj.discountMoney
        })
    } else {
        this.data.selectedCouponId = null
        this.setData({
            finalTotalPrice: this.data.order.getTotalPrice(),
            discountMoney: 0
        })
    }
  },
  
})