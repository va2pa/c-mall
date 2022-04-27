// components/spu-description/spu-description.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    likeStatus: false,
    favorNum: 0,
    doubleLike: false
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array
  },
  observers: {
    'spu': function (spu) {
        if (!spu) {
            return
        }
        if (!spu.tags) {
            return

        }
        const tags = spu.tags.split('$')
        this.setData({
            tags
        })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
