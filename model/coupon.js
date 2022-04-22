import {Http} from '../utils/http';

class Coupon{
  static async collectCoupon(cid) {
    return await Http.request({
        url: `coupon/collect/${cid}`,
        method: 'POST',
        throwError: true,
    })
  }
}

export{
  Coupon
}