// components/tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItemCount:Number
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
    onGotoHome(event) {
      this.triggerEvent('gotohome', {
      })
    },
    onGotoCart(event) {
      this.triggerEvent('gotocart')
    },
    onAddToCart(event) {
      this.triggerEvent('addtocart')
    },
    onBuy(event) {
      this.triggerEvent('buy')
    }
  }
})
