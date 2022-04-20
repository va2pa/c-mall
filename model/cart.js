class Cart{
  static SKU_MIN_COUNT = 1
  static SKU_MAX_COUNT = 9999
  static STORAGE_KEY = 'cart'

  constructor() {
    if (typeof Cart.instance === 'object') {
        return Cart.instance
    }
    Cart.instance = this
    this._cartData = this._getLocalCart()
    return this
  }

  addItem(newItem) {
    const cartData = this.getCartData()
    const oldItem = this.findSameItem(newItem.skuId)
    if (!oldItem) {
        cartData.items.unshift(newItem)
    } else {
        this._combineItems(oldItem, newItem.count)
    }
    this._refreshStorage()
  }

  removeItem(skuId) {
    const cartData = this.getCartData()
    const oldItemIndex = cartData.items.findIndex(item => {
        return item.skuId === skuId
    })
    cartData.items.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  getCartData() {
    return this._cartData;
  }

  getCartItemCount(){
    return this.getCartData().items.length;
  }

  isEmpty() {
    return this.getCartData().items.length === 0;
  }

  static isOnline(item) {
    return item.sku.online;
  }

  static isSoldOut(item) {
    return item.sku.stock <= 0;
  }


  _findEqualItemIndex(skuId) {
      const cartData = this.getCartData()
      return cartData.items.findIndex(item => {
          return item.skuId === skuId
      })
  }

  _getLocalCart() {
    const cartData = wx.getStorageSync(Cart.STORAGE_KEY)
    return cartData ? cartData : {items:[]}
  }

  findSameItem(skuId) {
    const items = this.getCartData().items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].skuId === skuId) {
            return items[i];
        }
    }
    return null;
}

  _combineItems(oldItem, newItemCount) {
    oldItem.count += newItemCount
    if (oldItem.count >= Cart.SKU_MAX_COUNT) {
      oldItem.count = cart.SKU_MAX_COUNT
    }
  }

  _refreshStorage() {
    wx.setStorageSync(Cart.STORAGE_KEY, this._cartData);
  }

}

export{
  Cart
}