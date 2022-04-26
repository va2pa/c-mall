import { Caculator } from "../utils/caculator"
import { Http } from "../utils/http"
import { Paging } from "../utils/paging"

class Order {
  orderItems
  itemCount

  constructor(orderItems, itemCount) {
      this.orderItems = orderItems
      this.itemCount = itemCount
  }

  static async placeOrder(orderPost) {
    return await Http.request({
        url: 'order/place',
        method: 'POST',
        data: orderPost
    })
  }

  static async fakePayOrder(orderId) {
    return await Http.request({
        url: `order/fakepay/${orderId}`,
        method: 'POST'
    })
  }

  static async getDetail(orderId) {
    return await Http.request({
        url: `order/detail/${orderId}`
    })
  }

  static geMyOrdersByStatus(status) {
    return new Paging({
        url: `order/by/status/${status}`
    })
  }

  static geMyOrdersUnpaid() {
    return new Paging({
        url: 'order/status/unpaid'
    })
  }

  static geMyOrdersCanceled() {
    return new Paging({
        url: 'order/status/canceled'
    })
  }

  getTotalPrice() {
    return this.orderItems.reduce((pre, item) => {
        const sum = Caculator.accAdd(pre, item.finalPrice)
        return sum
    }, 0)
  }

  getTotalPriceByCategories(categoryIds) {
    if (categoryIds.length === 0) {
        return 0
    }
    return categoryIds.reduce((sum, categoryId) => {
        const eachPrice = this.orderItems.reduce((pre, orderItem) => {
            const itemCategoryId = this._isInCategories(orderItem, categoryId)
            if (itemCategoryId) {
                return Caculator.accAdd(pre, orderItem.finalPrice)
            }
            return pre
        }, 0)
        return Caculator.accAdd(sum, eachPrice)
    }, 0);
  }

  _isInCategories(orderItem, categoryId) {
    if (orderItem.sku.root_category_id === categoryId
       || orderItem.sku.category_id === categoryId) {
        return true
    }
    return false
  }

  getOrderSkuInfoList() {
    return this.orderItems.map(item => {
        return {
            id: item.sku.id,
            count: item.count
        }
    })
  }
}

export{
  Order
}