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
      const specValues = orderItem.spec_values
      this.setData({
        // specValuesText:specValues?parseSpecValueArray(specValues):parseSpecValue(orderItem.specs)
        specValuesText: parseSpecs(orderItem.specs)
      })
      console.log(parseSpecs(orderItem.specs));
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
