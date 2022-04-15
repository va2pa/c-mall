import {SpuPaging} from '../../model/spu-paging'
// pages/spu-list/spu-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spuPaging: Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBottomSpuList(options.cid);
  },


  async initBottomSpuList(cid){
    this.data.spuPaging = SpuPaging.getByCategory(cid);
    const data = await this.data.spuPaging.applyMoreData();
    if(!data){
      return;
    }
    wx.lin.renderWaterFlow(data.items);
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
  }
})