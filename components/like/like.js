// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike:Boolean,
    count:Number,
    doubleLike: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    yesSrc:"/imgs/like/like.png",
    noSrc:"/imgs/like/like@dis.png"
  },
  observers: {
    'doubleLike': function (doubleLike) {
      if(!doubleLike){
        return;
      }
      this.setData({
        isLike: true,
        count: this.properties.count + 1,
        doubleLike: false
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods:{
    onLike:function(event){
      let isLike = this.properties.isLike;
      let count = this.properties.count;
      count = isLike ? count - 1 : count + 1;
      this.setData({
        count: count,
        isLike: !isLike
      });
      this.triggerEvent('like',{
        likeStatus:this.properties.isLike
      },{
        bubbles: true, 
        composed: true 
      });
    }
  }
})
