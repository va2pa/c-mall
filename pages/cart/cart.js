import { Cart } from "../../model/cart"
import { Caculator } from "../../utils/caculator";

const cart = new Cart();
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: false,
    allChecked: false,
    totalPrice: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const cartData = await cart.getSkuByServer();
    if (cartData) {
      this.setData({
          cartItems: cartData.items
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartItems = cart.getCartData().items
    if (cart.isEmpty()) {
        this.processEmpty()
        return
    }
    this.processNotEmpty();
    this.setData({
        cartItems
    })
    this.isAllChecked();
  },

  isAllChecked(){
    this.setData({
        allChecked: cart.isAllChecked()
    })
    this.calcuateCart();
  },

  onDeleteItem(event) {
    this.isAllChecked();
  },

  onCheck(event) {
    this.isAllChecked();
  },

  onCheckAll(event) {
    const checked = event.detail.checked
    cart.checkAll(checked)
    this.setData({
        cartItems: this.data.cartItems
    })
    this.calcuateCart();
  },

  calcuateCart() {
    const checkedItems = cart.getCheckedItems()
    const calcuator = new Caculator(checkedItems)
    calcuator.calc()
    const totalPrice = calcuator.getTotalPrice()
    this.setData({
        totalPrice
    })
  },
  onCounter(){
    this.calcuateCart();
  },
  processEmpty(){
    this.setData({
      empty: true
    })
    // 隐藏小红点
    wx.hideTabBarRedDot({
      index: 2,
    })
  },
  processNotEmpty() {
    this.setData({
        empty: false
    })
    wx.showTabBarRedDot({
        index: 2,
    })
  },
  onEmptyCart(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  }
})