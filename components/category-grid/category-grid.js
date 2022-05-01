// components/category-grid/category-grid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    grid:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapGridItem(event){
      const id = event.detail.key;
      this.triggerEvent('itemtap', {
          cid: id
      })
    }
  }
})
