import { ShoppingWay } from '../../core/enum';
import {Spu} from '../../model/spu'
import { SpuExplain } from '../../model/spu-explain';
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
    const explain = await SpuExplain.getExplain();
    this.setData({
      spu,
      explain
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onSpecChange(event){
    console.log(event.detail);
    this.setData({
      spec: event.detail
    });
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