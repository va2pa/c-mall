import { ShoppingWay } from '../../core/enum';
import {Spu} from '../../model/spu'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    cartItemCount:99,
    showRealm: false,
    shoppingWay: ShoppingWay.CART
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);
    // console.log(spu);
    this.setData({
      spu
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onGotoHome(event) {
    wx.switchTab({
        url: '/pages/home/home',
    });
  },
  onGotoCart(event) {
    wx.switchTab({
        url: '/pages/cart/cart',
    });
  },
  onAddToCart(){
    this.setData({
      showRealm: true,
      shoppingWay: ShoppingWay.CART
    });
  },

  onBuy(){
    this.setData({
      showRealm: true,
      shoppingWay: ShoppingWay.BUY
    });
  }
  
})