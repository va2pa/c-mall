class SkuPending{
  pending = []

  constructor(){

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