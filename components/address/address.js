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
        const addressInfo = await wx.chooseAddress({});
        console.log(addressInfo);
        if (addressInfo) {
            this.setData({
                address: addressInfo,
                hasChosen: true
            })
            this.triggerEvent('chooseAddress', {
              address: addressInfo
          })
        }
      }
  }
})
