import { cellStatus } from '../core/enum';
import {SkuCode} from './sku-code'
import { SkuPending } from './skuPending';
import {StringBuilder} from '../utils/stringBuilder'
class Judger{
  fenceGroup;
  pathDict = [];
  skuPending;

  constructor(fenceGroup){
    this.fenceGroup = fenceGroup;
    this._initSkuPending();
  }

  _initSkuPending(){
    this.skuPending = new SkuPending();
  }

  initPathDict(){
    this.fenceGroup.skuList.forEach(s => {
      const skuCode = new SkuCode(s.code);
      this.pathDict = this.pathDict.concat(skuCode.segments);
    });
  }

  judge(cell, x, y){
    this._changeCurrentCellStatus(cell, x, y);
    this.fenceGroup.eachCell((cell, x, y) => {
      this._changeOtherCellStatus(cell, x, y);
    });
  }
  _changeOtherCellStatus(cell, x, y){
    const path = this._findPath(cell, x, y);
    if(this.skuPending.isLatestSelectedInLine(cell, x)){
      return;
    }
    if(this._isInDict(path)){
      this.fenceGroup.fences[x].cells[y].status = cellStatus.WAITING;
    }else{
      this.fenceGroup.fences[x].cells[y].status = cellStatus.FORBIDDEN;
    }
  }
  _isInDict(path){
    return this.pathDict.includes(path);
  }

  _findPath(cell, x, y){
    const stringBuilder = new StringBuilder('#');
    for(let i = 0;i < this.fenceGroup.fences.length;i++){
      const selected = this.skuPending.findSelectedCell(i);
      if(x == i){
        //当前cell
        const cellCode = this._getCellCode(cell.spec);
        stringBuilder.append(cellCode);
      }else{
        //其他行选中cell
        if(selected){
          const selectedCellCode = this._getCellCode(selected.spec);
          stringBuilder.append(selectedCellCode);
        }
      }
    }
    return stringBuilder.toString();
  }

  _getCellCode(spec){
    return spec.key_id + '-' + spec.value_id;
  }

  _changeCurrentCellStatus(cell, x, y){
    if(cell.status === cellStatus.WAITING){
      this.fenceGroup.fences[x].cells[y].status = cellStatus.SELECTED;
      this.skuPending.insert(cell, x);
    }else if(cell.status === cellStatus.SELECTED){
      this.fenceGroup.fences[x].cells[y].status = cellStatus.WAITING;
      this.skuPending.remove(x);
    }
  }
}

export{
  Judger
}