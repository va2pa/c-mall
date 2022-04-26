import { OrderBO } from "../../model/order-bo"

// components/brief-order/brief-order.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    _item: Object,
  },
  observers: {
    'item, currentStatus': function (item) {
        if (!item) {
            return
        }
        const order = new OrderBO(item)
        this.setData({
            _item: order
        })
        
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onDetail(event) {
      const oid = this.data._item.id
      wx.navigateTo({
          url: `/pages/order-detail/order-detail?oid=${oid}`
      })
    },
    onCountdownEnd(){
      this.triggerEvent('countdownEnd');
    },
    onPay(){
      this.triggerEvent('onPay',{
        'orderId': this.properties.item.id
      });
    }
  }
})
