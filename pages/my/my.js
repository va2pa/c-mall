import { Jwt } from "../../model/jwt";
import { User } from "../../model/user"

// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip: false,
    showVipTip: false,
    vipTip: '',
    noToken: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async onShow(){
    let msg;
    try{
      msg = await User.checkVip();
    }catch(e){
      this.setData({
        vip: false
      });
      return;
    }
    if(msg.is_vip){
      this.setData({
        vip: true
      });
    }
    
  },

  onMyCoupon(){
    wx.navigateTo({
      url: "/pages/my-coupon/my-coupon"
    })
  },

  onMyFavor(){
    wx.navigateTo({
      url: "/pages/spu-list/spu-list?favor=true"
    })
  },

  onMyOrder(){
    wx.navigateTo({
      url: "/pages/my-order/my-order?status=0"
     })
  },
  async onRegisterVip(){
    let msg;
    try{
      msg = await User.registerVip();
    }catch(e){
      if (e.errorCode === 8002) {
        this.setData({
          showVipTip: true,
          vipTip: "单笔订单实付金额满500元才可申请"
        })
      }
      return;
    }
    if(msg.code === 0){
      await Jwt.resendTokenRequest();
      this.setData({
        showVipTip: true,
        vipTip: "恭喜您成为会员 ！",
        vip: true
      })
    }
  }
})