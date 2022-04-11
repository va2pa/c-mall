import { Cell } from "../../model/cell";
import { FenceGroup } from "../../model/fence-group";
import { Judger } from "../../model/judger";
import { Spu } from "../../model/spu";

// components/realm/realm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  observers:{
    'spu': function(spu){
      if(!spu){
        return;
      }
      //处理无规格
      if(Spu.noSpec(spu)) {
        this.processNoSpec(spu);
        return;
      }
      this.processHasSpec(spu);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    fences: Array,
    fenceGroup: Object
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu){
      this.setData({
        noSpec: true
      })
      this.bindSku(spu.sku_list[0]);
    },
    processHasSpec(spu){
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if(defaultSku){
        this.bindSku(defaultSku);
      }else{
        this.bindSpu();
      }
      this.bindCheckedStatus();
      this.bindFenceGroup(fenceGroup);
    },
    bindSpu(){
      const spu = this.properties.spu;
      this.setData({
        title: spu.title,
        price: spu.price,
        previewImg: spu.img,
        discountPrice: spu.discount_price
      });
    },
    bindSku(sku){
      this.setData({
        title: sku.title,
        price: sku.price,
        previewImg: sku.img,
        discountPrice: sku.discount_price,
        stock: sku.stock
      });
    },
    bindCheckedStatus(){
      this.setData({
        isSkuIntact: this.data.judger.skuPending.isSkuIntact(),
        checkedValues: this.data.judger.getCheckedSpecValues(),
        missingKeys: this.data.judger.getMissingSpecKeys()
      });
    },
    bindFenceGroup(fenceGroup){
      this.setData({
        fenceGroup : fenceGroup,
        fences: fenceGroup.fences
      });
    },
    onCellTap(event){
      let cell = event.detail.cell;
      const x = event.detail.x;
      const y = event.detail.y;
      const status = cell.status;
      cell = new Cell(cell.spec);
      cell.status = status;
      const judger = this.data.judger;
      judger.judge(cell, x, y);
      this.bindFenceGroup(judger.fenceGroup);
      this.bindCheckedStatus();
      if(this.data.isSkuIntact){
        const sku = judger.getIntactSku();
        this.bindSku(sku);
      }
    }
  }
})
