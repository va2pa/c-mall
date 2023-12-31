import { cellStatus } from "../core/enum";

class Cell{
  title;
  id;
  status = cellStatus.WAITING;
  spec;
  img;
  
  constructor(spec){
    this.spec = spec;
    this.title = spec.value;
    this.id = spec.value_id;
  }

  getCellCode(){
    return this.spec.key_id + '-' + this.spec.value_id;
  }

}

export{
  Cell
}