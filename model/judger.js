import { cellStatus } from '../core/enum';
import {SkuCode} from './sku-code'
import { SkuPending } from './sku-pending';
import {StringBuilder} from '../utils/stringBuilder'
class Judger{
  fenceGroup;
  pathDict = [];
  skuPending;

  constructor(fenceGroup){
    this.fenceGroup = fenceGroup;
    this._initPathDict();
    this._initSkuPending();
  }

  getCheckedSpecValues(){
    return this.skuPending.getCheckedSpecValues();
  }

  getMissingSpecKeys(){
    const keysIndex = this.skuPending.getMissingSpecKeysIndex();
    return keysIndex.map(i => {
      return this.fenceGroup.fences[i].key;
    });
  }
  getIntactSku(){
    const skuCode = this.skuPending.getSkuCode();
    return this.fenceGroup.getSkuByCode(skuCode);
  }

  _initSkuPending(){
    this.skuPending = new SkuPending(this.fenceGroup.fences.length);
    const defaultSku = this.fenceGroup.getDefaultSku();
    if(!defaultSku){
      return;
    }
    this.skuPending.initDefaultSku(defaultSku);
    this.judge(null, null, null, true);
  }

  _initPathDict(){
    this.fenceGroup.skuList.forEach(s => {
      const skuCode = new SkuCode(s.code);
      this.pathDict = this.pathDict.concat(skuCode.segments);
    });
  }

  judge(cell, x, y, isInit=false){
    if(!isInit){
      this._changeCurrentCellStatus(cell, x, y);
    }
    this._changeOtherCellStatus();
  }
  _changeOtherCellStatus(){
    this.fenceGroup.eachCell((cell, x, y) => {
      const path = this._findPath(cell, x, y);
      if(this.skuPending.isLatestSelectedInLine(cell, x)){
        // 为了初始化默认规格，手动选择时该赋值是冗余操作
        cell.status = cellStatus.SELECTED;
        return;
      }
      if(this._isInDict(path)){
        cell.status = cellStatus.WAITING;
      }else{
        cell.status = cellStatus.FORBIDDEN;
      }
    });
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