import { Cell } from "../../model/cell";
import { FenceGroup } from "../../model/fence-group";
import { Judger } from "../../model/judger";

// components/realm/realm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    fences: Array
  },

  observers:{
    'spu': function(spu){
      if(!spu){
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if(defaultSku){
        this.initSku(defaultSku);
      }else{
        this.initSpu();
      }
      this.initData(fenceGroup);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initSpu(){
      const spu = this.properties.spu;
      this.setData({
        title: spu.title,
        price: spu.price,
        previewImg: spu.img,
        discountPrice: spu.discount_price
      });
    },
    initSku(sku){
      this.setData({
        title: sku.title,
        price: sku.price,
        previewImg: sku.img,
        discountPrice: sku.discount_price,
        stock: sku.stock
      });
    },
    initData(fenceGroup){
      this.setData({
        fences: fenceGroup.fences
      });
    },
    onCellTap(event){
      const cell = event.detail.cell;
      const x = event.detail.x;
      const y = event.detail.y;
      this.data.judger.judge(cell, x, y);
      this.setData({
        fences: this.data.judger.fenceGroup.fences
      })
    }
  }
})
