import { getWindowHeightRpx } from "../../utils/system";
import { Categories } from "../../model/categories";
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initCategoryData();
    this.setSegmentHeight();
  },

  async initCategoryData() {
    const categories = new Categories()
    this.data.categories = categories

    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const subCategories = categories.getSubs(defaultRoot.id)
    this.setData({
        roots,
        subCategories,
    })
  },
  getDefaultRoot(roots) {
    let defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
    return defaultRoot ? defaultRoot : roots[0];
  },
  onSegChange(event) {
    // *1 将String类型转Number类型
    const rootId = event.detail.activeKey * 1
    console.log(rootId);
    const categories = this.data.categories
    const subCategories = categories.getSubs(rootId)
    console.log(subCategories);
    const currentRoot = categories.getRoot(rootId)
    this.setData({
        subCategories,
        currentBannerImg: currentRoot.img
    })

},
onGoToSpuList(event) {
    const cid = event.detail.cid
    wx.navigateTo({
        url: `/pages/spu-list/spu-list?cid=${cid}`
    });
},

  async setSegmentHeight() {
    const windowHeightRpx = await getWindowHeightRpx();
    const segHeight = windowHeightRpx - 60 - 20 - 2
    this.setData({
        segHeight: segHeight
    })
  },

  onGotoSearch(event) {
    wx.navigateTo({
        url: '/pages/search/search',
    });
  },

})