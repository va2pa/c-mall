import { StringBuilder } from "../utils/stringBuilder";
import { Cell } from "./cell";

class SkuPending{
  pending = []
  size;
  constructor(size){
    this.size = size;
  }

  initDefaultSku(sku){
    for(let i = 0;i < sku.specs.length;i++){
      const cell = new Cell(sku.specs[i]);
      this.insert(cell, i);
    }
  }

  getCheckedSpecValues(){
    return this.pending.map(cell => {
      return cell ? cell.spec.value : null;
    });
  }

  getMissingSpecKeysIndex(){
    const keysIndex = [];
    for(let i = 0;i < this.pending.length;i++){
      if(!this.pending[i]){
        keysIndex.push(i);
      }
    }
    return keysIndex;
  }

  getSkuCode(){
    const stringBuilder = new StringBuilder('#');
    for(let i = 0;i < this.size;i++){
      const cellCode = this.pending[i].getCellCode();
      stringBuilder.append(cellCode);
    }
    return stringBuilder.toString();
  }

  isSkuIntact(){
    for(let i = 0;i < this.size;i++){
      if(!this.pending[i]){
        return false;
      }
    }
    return true;
  }

  insert(cell, x){
    this.pending[x] = cell;
  }

  remove(x){
    this.pending[x] = null
  }

  findSelectedCell(x){
    return this.pending[x];
  }

  isLatestSelectedInLine(cell, x){
    const selectedCell = this.pending[x];
    if(!selectedCell){
      return false;
    }
    return selectedCell.id === cell.id;
  }
}

export {
  SkuPending
}