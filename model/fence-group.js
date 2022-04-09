import {Fence} from './fence'
import {Matrix} from './matrix'
class FenceGroup{
  spu;
  skuList = [];
  fences = [];
  
  constructor(spu){
    this.spu = spu;
    this.skuList = spu.sku_list;
  }

  eachCell(callback){
    for(let i = 0;i < this.fences.length; i++){
      for(let j = 0;j < this.fences[i].cells.length; j++){
        callback(this.fences[i].cells[j], i ,j);
      }
    }
  }

  initFences(){
    const matrix = this._createMatrix(this.skuList);
    const fences = [];
    matrix.transpose().forEach(row => {
      //由于row已完成转置，可以直接传入构造函数，封装性好
      const fence = new Fence(row);
      fence.init();
      fences.push(fence);
    });
    this.fences = fences;
  }

  _createMatrix(skuList){
    const m = [];
    skuList.forEach(sku => {
      // sku.specs:
      // [{key_id: 1, key: "颜色", value_id: 45, value: "金属灰"},
      // {key_id: 3, key: "图案", value_id: 9, value: "七龙珠"},
      // {key_id: 4, key: "尺码", value_id: 14, value: "小号 S"}]
      m.push(sku.specs);
    });
    return new Matrix(m);
  }
    // initFences2(){
  //   const matrix = this._createMatrix(this.skuList);
  //   let curJ = -1;
  //   const fences = [];
  //   matrix.each((e, i, j)=>{
  //     if(curJ != j){
  //       fences[j] = new Fence();
  //       curJ = j;
  //     }
  //     fences[j].pushValues(e.value);
  //   });
  //   console.log(fences);
  // }
}

export {
  FenceGroup
}