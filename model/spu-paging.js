import {Paging} from '../utils/paging'

class SpuPaging{
  static getLatestPaging(){
    return new Paging({
      url:'spu/latest'
    }, 6);
  }
}

export {
  SpuPaging
}