import { parseSpecs } from "../../utils/sku";

// components/order-item/order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    specValuesText: null
  },

  observers: {
    'orderItem': function (orderItem) {
      console.log(orderItem)
      this.setData({
        specValuesText: parseSpecs(orderItem.sku.specs)
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
