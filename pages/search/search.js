import { HistorySearch } from "../../model/history-search"
import { SpuPaging } from "../../model/spu-paging"
import { Tag } from "../../model/tag"

const history = new HistorySearch()
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spuPaging: Object,
    items: [],
    tip: ''
  },

  /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
      const historyTags = history.get()
      const hotTags = await Tag.getAllTags()
      this.setData({
          historyTags,
          hotTags
      })
  },
  async onSearch(event) {
    console.log(this.data.tip);
      this.setData({
          search: true,
          items: []
      })
      const keyword = event.detail.value || event.detail.name
      if (!keyword) {
          showToast("请输入关键字！")
          return
      }
      history.save(keyword)
      this.setData({
          historyTags: history.get()
      })

      this.data.spuPaging = SpuPaging.search(keyword)
      console.log(this.data.spuPaging);
      wx.lin.showLoading({
          color: "#157658",
          type: "flash",
          fullScreen: true
      })
      const data = await this.data.spuPaging.applyMoreData()
      wx.lin.hideLoading()
      if(data.accumulator.length !== 0){
        this.bindItems(data)
      }else{
        this.setData({
          tip: '搜索结果为空'
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

  onCacel(event) {
      this.setData({
          search: false,
          items: [],
          tip: ''
      })
  },

  onDeleteHistory(event) {
      history.clear()
      this.setData({
          historyTags: []
      })
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