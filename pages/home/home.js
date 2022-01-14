import {Theme} from '../../model/theme';
import {Banner} from '../../model/banner'
import {Category} from '../../model/category'
import {Activity} from '../../model/activity'
import {SpuPaging, SupPaging} from '../../model/spu-paging'
// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerA: null,
    categoryGrid: [],
    activityA:null,
    themeB: null,
    themeBSpuList: [],
    themeC: null,
    bannerB: null,
    themeD: null,
    spuPaging: null,
    loadingType: 'loading'
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
    console.log(data)
    if(!data){
      return;
    }
    console.log(data.items)
    wx.lin.renderWaterFlow(data.items);
  },

  async initData(){
    const themeObj = new Theme();
    await themeObj.getThemes();
    const themeA = await themeObj.getHomeLocation1();
    const bannerA = await Banner.getHomeLocation2();
    const categoryGrid = await Category.getHomeLocation3();
    const activityA = await Activity.getHomeLocation4();
    const themeB = themeObj.getHomeLocation5();
    let themeBSpuList = [];
    if(themeB.online){
      const themeBwithSpu = await Theme.getThemeWithSpu(Theme.getHomeLocation5Name());
      if(themeBwithSpu){
        themeBSpuList = themeBwithSpu.spu_list.slice(0,6);
      }
    }
    const themeC = themeObj.getHomeLocation6();
    const bannerB = await Banner.getHomeLocation7();
    const themeD = themeObj.getHomeLocation8();
    console.log(bannerB);
    this.setData({
      themeA,
      bannerA,
      categoryGrid,
      activityA,
      themeB,
      themeBSpuList,
      themeC,
      bannerB,
      themeD
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})