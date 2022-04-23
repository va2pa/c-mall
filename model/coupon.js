import { CouponType } from '../core/enum';
import { Caculator } from '../utils/caculator';
import {Http} from '../utils/http';

class Coupon{

  constructor(coupon) {
    this.fullMoney = coupon.full_money
    this.startTime = coupon.start_time
    this.title = coupon.title
    this.satisfy = false
    this.endTime = coupon.end_time
    this.wholeStore = coupon.whole_store
    this.id = coupon.id
    this.rate = coupon.rate
    this.minus = coupon.minus
    this.type = coupon.type
    this.categoryIds = coupon.categories.map(category => {
        return category.id
    })
  }

  static async collectCoupon(cid) {
    return await Http.request({
        url: `coupon/collect/${cid}`,
        method: 'POST',
        throwError: true,
    })
  }

  static async getAvailableWithCategory() {
    return await Http.request({
        url: 'coupon/myself/available/with_category'
    })
  }

  static getFinalTotalPrice(orderPirce, couponData) {
    console.log(couponData.type);
    if(couponData.type === CouponType.FULL_MINUS){
      return {
        finalPrice: Caculator.accSubtract(orderPirce, couponData.minus),
        discountMoney: couponData.minus
      }
    }
    if(couponData.type === CouponType.FULL_OFF){
      const finalPrice = Coupon.roundMoney(Caculator.accMultiply(orderPirce, couponData.rate));
      return {
        finalPrice,
        discountMoney: Caculator.accSubtract(orderPirce, finalPrice)
      }
    }
    if(couponData.type === CouponType.NO_THRESHOLD){
      let finalPrice = Caculator.accSubtract(orderPirce, couponData.minus)
      finalPrice = finalPrice >= 0 ? finalPrice : 0
      return {
          finalPrice,
          discountMoney: couponData.minus
      }
    }
  }

  satisfyUse(order){
    let categoryTotalPrice
    if (this.wholeStore) {
        categoryTotalPrice = order.getTotalPrice()
    } else {
        categoryTotalPrice = order.getTotalPriceByCategories(this.categoryIds)
    }
    // console.log(">>>>>>>>>>>>>>>>>>>");
    // console.log(this.title);
    // console.log(categoryTotalPrice);
    // console.log(">>>>>>>>>>>>>>>>>>>");
    if(this.type === CouponType.NO_THRESHOLD){
      this.satisfy = true
    }else{
      this.satisfy = categoryTotalPrice >= this.fullMoney
    }
  }
  
  static roundMoney(money) {
    return Math.ceil(money * 100) / 100;
  }
}

export{
  Coupon
}