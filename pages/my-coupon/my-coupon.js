import { Coupon } from "../../model/coupon";
import { CouponStatus } from "../../core/enum";

// pages/my-coupon/my-coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: false,
    availableCopuons:[],
    usedCopuons:[],
    expiredCopuons:[],
    currentCoupons: [],
    status: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.data.availableCopuons = await Coupon.geMyCouponsByStatus(CouponStatus.AVAILABLE);
    this.data.usedCopuons = await Coupon.geMyCouponsByStatus(CouponStatus.USED);
    this.data.expiredCopuons = await Coupon.geMyCouponsByStatus(CouponStatus.EXPIRED);
    this.bindAvailableCoupons();

  },
  async changeTabs(event) {
    // *1 将String类型转Number类型
    const status = event.detail.activeKey * 1;
    switch (status) {
      case CouponStatus.AVAILABLE:
        this.bindAvailableCoupons();
        break;
      case CouponStatus.USED:
        this.bindUsedCoupons();
        break;
      case CouponStatus.EXPIRED:
        this.bindExpiredCoupons();
        break;
    }
    console.log(this.data.currentCoupons);
  },
  bindAvailableCoupons(){
    const currentCoupons = this.data.availableCopuons;
    this.setData({
      currentCoupons,
      empty: currentCoupons.length === 0,
      status: CouponStatus.AVAILABLE
    });

  },
  bindUsedCoupons(){
    const currentCoupons = this.data.usedCopuons;
    this.setData({
      currentCoupons,
      empty: currentCoupons.length === 0,
      status: CouponStatus.USED
    });
  },
  bindExpiredCoupons(){
    const currentCoupons = this.data.expiredCopuons;
    this.setData({
      currentCoupons,
      empty: currentCoupons.length === 0,
      status: CouponStatus.EXPIRED
    });
  }
})