import {SpuPaging} from '../../model/spu-paging'
// pages/spu-list/spu-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spuPaging: Object,
    tip: ''
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
    if(data.accumulator.length !== 0){
      this.bindItems(data)
    }else{
      this.setData({
        tip: '该分类无商品'
      });
    }
  },

  bindItems(data) {
    if (data.accumulator.length !== 0) {
        this.setData({
            items: data.accumulator,
            tip: ''
        })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.spuPaging.applyMoreData();
    if(!data){
      return;
    }
    this.bindItems(data);
    if(!data.moreData){
      this.setData({
        loadingType: 'end'
      });
    }
  }
})