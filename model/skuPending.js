import { Cell } from "./cell";

class SkuPending{
  pending = []

  constructor(){

  }

  initDefaultSku(sku){
    for(let i = 0;i < sku.specs.length;i++){
      const cell = new Cell(sku.specs[i]);
      this.insert(cell, i);
    }
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