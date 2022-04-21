import { Cart } from "../../model/cart"
import { parseSpecs } from "../../utils/sku"

const cart = new Cart();
// components/cart-item/cart-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    soldOut: Boolean,
    discount: Boolean,
    skuCount: 1,
    specStr: String,
    online: Boolean,
    stock: Cart.SKU_MAX_COUNT
    
  },
  observers: {
    cartItem: function (cartItem) {
        if (!cartItem) {
            return;
        }
        const specStr = parseSpecs(cartItem.sku.specs);
        const discount = cartItem.sku.discount_price ? true : false;
        const soldOut = Cart.isSoldOut(cartItem);
        const online = Cart.isOnline(cartItem);
        this.setData({
            specStr,
            discount,
            soldOut,
            online,
            stock: cartItem.sku.stock,
            skuCount: cartItem.count
        })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(event) {
      const skuId = this.properties.cartItem.skuId;
      cart.removeItem(skuId);
      this.setData({
          cartItem: null
      })
      this.triggerEvent('itemdelete', {
          skuId
      })
    },
    checkedItem(event) {
      const checked = event.detail.checked;
      const skuId = this.properties.cartItem.skuId;
      cart.checkchange(skuId);
      this.properties.cartItem.checked = checked;
      this.triggerEvent('itemcheck');
    },
    onCounter(event) {
      let count = event.detail.count;
      const skuId = this.properties.cartItem.skuId;
      cart.updateItemCount(skuId, count);
      this.triggerEvent("count");
    }
  }
})
