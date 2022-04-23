import { Caculator } from "../utils/caculator"
import { Cart } from "./cart"

class OrderItem {
  sku
  count = 0
  cart = new Cart()

  constructor(sku, count) {
      this.sku = sku
      this.count = count
      this.singleFinalPrice = sku.actual_price;
      this.finalPrice = Caculator.accMultiply(this.count, this.singleFinalPrice)
  }
}

export {
  OrderItem
}