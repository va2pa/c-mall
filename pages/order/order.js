import { ShoppingWay } from "../../core/enum"
import { Cart } from "../../model/cart"
import { Sku } from "../../model/sku";
import { OrderItem } from "../../model/order-item";
import { Order } from "../../model/order";

const cart = new Cart();
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let orderItems
    let localItemCount

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
        localItemCount = skuIds.length
    // }

    const order = new Order(orderItems, localItemCount)
    this.setData({
      orderItems: orderItems
    });
  },
  async getCartOrderItems(skuIds) {
    const skuList = await Sku.getSkuByIds(skuIds);
    const orderItems = skuList.map((sku) => {
      const count = cart.getCountBySkuId(sku.id)
      return new OrderItem(sku, count)
    })
    return orderItems;
  },


})