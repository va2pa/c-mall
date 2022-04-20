
class CartItem {
  skuId = null
  sku = null
  count = 0
  checked = true

  constructor(sku, count) {
      this.skuId = sku.id
      this.sku = sku
      this.count = count
  }
}
export {
  CartItem
}