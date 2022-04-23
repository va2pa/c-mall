import { Sku } from "./sku"

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

  checkchange(skuId) {
    const item = this.findSameItem(skuId);
    item.checked = !item.checked;
    this._refreshStorage();
  }

  isAllChecked() {
    let cartItems = this.getCartData().items;
    for (const item of cartItems) {
        if (!item.checked) {
            return false;
        }
    }
    return true;
  }

  checkAll(checked) {
    let items = this.getCartData().items;
    items.forEach(item => {
        item.checked = checked;
    });
    this._refreshStorage();
  }

  getCheckedItems() {
    const checkedItems = [];
    this.getCartData().items.forEach(item => {
        if (item.checked) {
          checkedItems.push(item);
        }
    });
    return checkedItems;
  }

  updateItemCount(skuId, newCount) {
    const item = this.findSameItem(skuId);
    if (newCount >= Cart.SKU_MAX_COUNT) {
      newCount = Cart.SKU_MAX_COUNT;
    }
    item.count = newCount;
    this._refreshStorage();
  }

  getSkuByIds() {
    const cartData = this.getCartData()
    if (cartData.items.length === 0) {
        return []
    }
    return cartData.items.map((sku) => sku.skuId)
  }

  getCheckedSkuIds() {
    const cartData = this.getCartData();
    const skuIds = [];
    if (cartData.items.length === 0) {
        return skuIds;
    }
    cartData.items.forEach(item => {
        if (item.checked) {
            skuIds.push(item.sku.id);
        }
    });
    return skuIds;
  }
  getCountBySkuId(skuId) {
    const cartData = this.getCartData();
    const item = cartData.items.find(item => item.skuId === skuId);
    return item.count;
  }

  removeCheckedItems() {
    const cartData = this.getCartData()
    for (let i = 0;i < cartData.items.length;i++) {
        if (cartData.items[i].checked) {
            cartData.items.splice(i, 1)
        }
    }
    this._refreshStorage();
  }

  async getSkuByServer() {
    const cartData = this.getCartData()
    if (cartData.items.length === 0) {
        return null
    }
    const skuIds = this.getSkuByIds()
    const serverData = await Sku.getSkuByIds(skuIds)
    this._refreshDataByServer(serverData)
    this._refreshStorage()
    return this.getCartData()
  }
  _refreshDataByServer(serverData) {
    const cartData = this.getCartData()
    cartData.items.forEach(item => {
      let find = false;
      for (const sku of serverData) {
          if (item.skuId=== sku.id) {
            item.sku = sku
            find = true
            break
          }
      }
      if (!find) {
        item.sku.online = false
      }
    });
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