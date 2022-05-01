import {Paging} from '../utils/paging'

class SpuPaging{
  static getLatestPaging(){
    return new Paging({
      url:'spu/latest'
    },6);
  }

  static getByCategory(cid){
    return new Paging({
      url: `spu/by/category/${cid}`,
    });
  }
  
  static getByRootCategory(cid){
    return new Paging({
      url: `spu/by/category/${cid}?is_root=true`,
    });
  }

  static search(keyword) {
    return new Paging({
        url: `spu/search?keyword=${keyword}`
    })
  }

  static getMyFavor() {
    return new Paging({
        url: 'spu/myself/favor'
    })
  }
}

export {
  SpuPaging
}