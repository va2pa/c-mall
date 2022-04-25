import { Caculator } from "../utils/caculator"
import { OrderStatus } from "../core/enum";
import { getSlashYMDHMS } from "../utils/date";

class OrderBO {
  period = 0
  discountPrice = 0
  createTime = null
  constructor(OrderBO) {
      Object.assign(this, OrderBO)
      this.correctOrderStatus()
      this.calDiscountPrice()
      this.createTime = getSlashYMDHMS(OrderBO.create_time)
  }

  calDiscountPrice() {
      this.discountPrice = Caculator.accSubtract(this.total_price, this.final_total_price)
  }

  correctOrderStatus() {
      if (this.status == OrderStatus.UNPAID) {
          const currentTimestamp = new Date().getTime();
          if (this.expired_time > currentTimestamp) {
              const mill = this.expired_time - currentTimestamp
              this.period = Math.round(mill / 1000)
          }else {
            this.status = OrderStatus.CANCELED
          }
      }
  }

}

export {
  OrderBO
}

