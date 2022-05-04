import { Cell } from "./cell";
//Fence代表一组同类规格，如颜色
class Fence{
  cells = []; //规格值
  specs;  //规格对象
  key;  //规格名
  keyId;   //规格名id

  constructor(specs){
    // specs:
    // [{key_id: 1, key: "颜色", value_id: 45, value: "灰色"},
    // {key_id: 1, key: "颜色", value_id: 42, value: "青色"},
    // {key_id: 1, key: "颜色", value_id: 42, value: "青色"},
    // {key_id: 1, key: "颜色", value_id: 44, value: "橙色"}]
    this.specs = specs;
    this.key = specs[0].key;
    this.keyId = specs[0].key_id;
  }

  init(){
    this._initCells();
  }
  _initCells(){
    // 避免添加重复的spec_value
    this.specs.forEach(spec => {
      const existed = this.cells.some(c => {
        return c.id === spec.value_id;
      });
      if(existed){
        return;
      }
      this.cells.push(new Cell(spec));
    });
  }
}

export{
  Fence
}