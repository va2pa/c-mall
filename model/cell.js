import { cellStatus } from "../core/enum";

class Cell{
  title;
  id;
  status = cellStatus.WAITING;
  spec;
  constructor(spec){
    this.spec = spec;
    this.title = spec.value;
    this.id = spec.value_id;
  }
}

export{
  Cell
}