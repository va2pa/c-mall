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
    selectedCouponId: null,
    discountMoney: 0,
    showCouponList: false,
    address: null,
    submitDisable: false,
    addressEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let orderItems
    let itemCount

    const shoppingWay = options.way
    this.data.shoppingWay = shoppingWay

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
    const skuList = await Sku.getSkuByIds(skuIds);
    const orderItems = skuList.map((sku) => {
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
    const orderPost = new OrderPost(
        this.data.totalPrice,
        this.data.finalTotalPrice,
        this.data.currentCouponId,
        this.data.order.getOrderSkuInfoList(),
        this.data.address
    )
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