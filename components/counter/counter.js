import { Cart } from "../../model/cart";

// components/counter/counter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    min: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOverStep(event) {
      const minOrMaxOut = event.detail.type
      console.log(minOrMaxOut);
      if (minOrMaxOut == 'overflow_max') {
          wx.showToast({
              title: '超出最大购买数量',
              icon: 'none',
              duration: 1500,
          });
      }
    }
  }
})
