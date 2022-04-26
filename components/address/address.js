// components/address/address.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address: Object,
    hasChosen: false,
    readOnly: false
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
    async onChooseAddress(event) {
      if(this.properties.readOnly){
        return;
      }
      this.getUserAddress()
    },
    async getUserAddress() {
        const addressInfo = await wx.chooseAddress({});
        console.log(addressInfo);
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
