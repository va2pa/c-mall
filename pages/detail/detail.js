import { ShoppingWay } from '../../core/enum';
import { Cart } from '../../model/cart';
import { CartItem } from '../../model/cart-item';
import {Spu} from '../../model/spu'
import { SpuExplain } from '../../model/spu-explain';
import { getWindowHeightRpx } from "../../utils/system";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    cartItemCount:0,
    showRealm: false,
    shoppingWay: ShoppingWay.CART,
    lastTapTime: 0,
    likeStatus: false,
    favorNum: 0,
    doubleLike: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);
    const likeMsg = await Spu.isLike(pid);
    const explain = await SpuExplain.getExplain();
    const windowHeightRpx = await getWindowHeightRpx();
    const swiperH = windowHeightRpx - 60 - 20 - 2
    const likeStatus = likeMsg.is_like;
    console.log(likeMsg);
    console.log(likeStatus);
    this.setData({
      spu,
      likeStatus,
      explain,
      swiperH,
      favorNum: spu.favor_num
    });
    this.updateCartItemCount();
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
  },
  OnShopping(event) {
    console.log(event.detail);
    const sku = event.detail.sku;
    const skuCount = event.detail.skuCount;
    if (event.detail.shoppingWay === ShoppingWay.BUY) {
      wx.navigateTo({
          url: `/pages/order/order?sku_id=${sku.id}&count=${skuCount}&way=${ShoppingWay.BUY}`,
      });
    }
    if (event.detail.shoppingWay === ShoppingWay.CART) {
        const cart = new Cart()
        const cartItem = new CartItem(sku, skuCount)
        console.log(cartItem);
        cart.addItem(cartItem);
        this.updateCartItemCount();
    }
  },
  updateCartItemCount() {
    const cart = new Cart()
    this.setData({
        cartItemCount: cart.getCartItemCount(),
        showRealm: false
    })
  },
  onLike(event){
    this.data.likeStatus = event.detail.likeStatus;
    if(this.data.likeStatus){
      Spu.like(this.data.spu.id);
    }else{
      Spu.disLike(this.data.spu.id);
    }
  },
  doubleClick(e) {
    var curTime = e.timeStamp;
    var lastTime = this.data.lastTapTime;
    if (curTime - lastTime > 0 && curTime - lastTime < 300) {
      if(!this.data.likeStatus){
        console.log('doubleLike');
        this.setData({
          likeStatus: true,
          doubleLike: true
        })
        e.detail.likeStatus = true;
        this.onLike(e);
      }
    }
    this.setData({
      lastTapTime: curTime
    })
  }
  
})