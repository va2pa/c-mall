import { parseSpecs, parseSpecValues } from "../../utils/sku";

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
      let specValuesText;
      if(orderItem.spec_values){
        specValuesText = parseSpecValues(orderItem.spec_values);
        console.log(specValuesText);
      }else{
        specValuesText = parseSpecs(orderItem.sku.specs);
      }
      this.setData({
        specValuesText
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
