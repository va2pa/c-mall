import {Http} from '../utils/http';

class Activity{

  static async getActivity(activityName){
    return await Http.request({
      url: `activity/name/${activityName}`
    })
  }

  static async getActivityWithCoupon(activityName) {
    return await Http.request({
        url: `activity/name/${activityName}/with_coupon`
    })
  }
}

export{
  Activity
}