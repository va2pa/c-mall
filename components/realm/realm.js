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
      judger.initPathDict();
      this.data.judger = judger;
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
