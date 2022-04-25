import {Paging} from '../utils/paging'

class SpuPaging{
  static getLatestPaging(){
    return new Paging({
      url:'spu/latest'
    });
  }

  static getByCategory(cid){
    return new Paging({
      url: `spu/by/category/${cid}`
    });
  }

  static search(keyword) {
    return new Paging({
        url: `spu/search?keyword=${keyword}`
    })
  }
}

export {
  SpuPaging
}