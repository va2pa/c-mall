import { Caculator } from "../utils/caculator"
import { Http } from "../utils/http"

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
        data: orderPost,
        throwError: true
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
}

export{
  Order
}