import {Http} from '../utils/http';

class Activity{
  static activityName = 'a-2';
  static vipActivityName = 'a-0';
  static async getHomeLocation4(){
    return await Http.request({
      url: `activity/name/${Activity.activityName}`
    })
  }

  static async getActivityWithCoupon(activityName) {
    return await Http.request({
        url: `activity/name/${activityName}/with_coupon`
    })
  }

  static async getVipActivityWithCoupon(activityName) {
    return await Http.request({
        url: `activity/name/${activityName}/with_coupon/vip`,
        throwError: true
    })
  }
}

export{
  Activity
}