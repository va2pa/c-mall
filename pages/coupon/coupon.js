import { Activity } from "../../model/activity";

// pages/coupons/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showVipTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(options);
    const activityName = options.name
    const activity = await Activity.getActivityWithCoupon(activityName)
    const couponList = activity.coupons
    console.log(couponList);


    this.setData({
        couponList
    });
  },

  onConfirm(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})