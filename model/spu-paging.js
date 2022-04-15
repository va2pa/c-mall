import {Paging} from '../utils/paging'

class SpuPaging{
  static getLatestPaging(){
    return new Paging({
      url:'spu/latest'
    }, 6);
  }

  static getByCategory(cid){
    return new Paging({
      url: `spu/by/category/${cid}`
    }, 6);
  }
}

export {
  SpuPaging
}