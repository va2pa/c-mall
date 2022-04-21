// components/address/address.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    address: Object,
    hasChosen: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async onChooseAddress(event) {
      this.getUserAddress()
    },
    async getUserAddress() {
        let res;
        try {
            res = await wx.chooseAddress({});
            console.log(res);
        } catch (error) {
          
        }
        if (res) {
            this.setData({
                address: res,
                hasChosen: true
            })
        }
      }
  }
})
