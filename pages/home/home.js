import {Category} from '../../model/category'
import {Activity} from '../../model/activity'
import {SpuPaging} from '../../model/spu-paging'
import { User } from '../../model/user';

// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryGrid: [],
    activityA:null,
    activityB:null,
    spuPaging: null,
    loadingType: 'loading',
    showVipTip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initData();
    this.initBottomSpuList();
  },

  async initBottomSpuList(){
    this.data.spuPaging = SpuPaging.getLatestPaging();
    const data = await this.data.spuPaging.applyMoreData();
    if(!data){
      return;
    }
    wx.lin.renderWaterFlow(data.items);
  },

  async initData(){
    const categoryGrid = await Category.getHomeLocation3();
    const activityA = await Activity.getActivity('a-1');
    const activityB = await Activity.getActivity('a-0');
    this.setData({
      categoryGrid,
      activityA,
      activityB
    })
  },
  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.spuPaging.applyMoreData();
    if(!data){
      return;
    }
    wx.lin.renderWaterFlow(data.items);
    if(!data.moreData){
      this.setData({
        loadingType: 'end'
      });
    }
  },
  onCoupons(event) {
    wx.navigateTo({
        url: '/pages/coupon/coupon?name=a-1'
    });
  },
  async onVipCoupons(event) {
    try{
      await User.checkVip()
    }catch(e){
      if(e.errorCode === 1005){
        this.setData({
          showVipTip: true
        });
      }
      return;
    }
    wx.navigateTo({
        url: '/pages/coupon/coupon?name=a-0'
    });
  },
  onGotoSearch(event) {
    wx.navigateTo({
        url: '/pages/search/search',
    });
  },
  onGoToSpuList(event) {
    const cid = event.detail.cid
    wx.navigateTo({
        url: `/pages/spu-list/spu-list?cid=${cid}&is_root=true`
    });
},
})