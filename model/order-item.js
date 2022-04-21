import { Caculator } from "../utils/caculator"
import { Cart } from "./cart"

class OrderItem {
  sku
  count = 0
  cart = new Cart()

  constructor(sku, count) {
      this.sku = sku
      this.count = count
      this.singleFinalPrice = this.getSingleFinalPrice(sku)
      this.finalPrice = Caculator.accMultiply(this.count, this.singleFinalPrice)
  }

  getSingleFinalPrice(sku) {
    if (sku.discount_price) {
        return sku.discount_price
    }
    return sku.price
  }
}

export {
  OrderItem
}