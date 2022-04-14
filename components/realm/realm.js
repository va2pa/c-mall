import { Cart } from "../../model/cart";
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
    spu: Object,
    shoppingWay: String
  },

  observers:{
    'spu': function(spu){
      if(!spu){
        return;
      }
      if(Spu.noSpec(spu)) {
        //处理无规格
        this.processNoSpec(spu);
      }else{
        this.processHasSpec(spu);
      }
      this.triggerSpecEvent();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    fences: Array,
    fenceGroup: Object,
    stock: Number,
    currentCount: Cart.SKU_MIN_COUNT,
    outStock: Number
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
      this.setStockStatus(spu.sku_list[0].stock);
    },
    processHasSpec(spu){
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if(defaultSku){
        this.bindSku(defaultSku);
        this.setStockStatus(defaultSku.stock);
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
    setStockStatus(stock){
      this.setData({
        outStock : stock < this.data.currentCount
      });
    },
    onCounter(event){
      this.data.currentCount = event.detail.count;
      if(this.data.isSkuIntact){
        this.setStockStatus(this.data.stock);
      }
    },
    triggerSpecEvent(){
      const noSpec = Spu.noSpec(this.properties.spu);
      if(noSpec){
        this.triggerEvent('specChange',{
          noSpec: noSpec,
        });
      }else{
        this.triggerEvent('specChange',{
          noSpec: noSpec,
          isSkuIntact: this.data.judger.skuPending.isSkuIntact(),
          checkedValues: this.data.judger.getCheckedSpecValues(),
          missingKeys: this.data.judger.getMissingSpecKeys()
        });
      }
      
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
        this.setStockStatus(sku.stock);
      }
      this.triggerSpecEvent();
    }
  }
})
