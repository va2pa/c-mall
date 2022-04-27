import {Http} from '../utils/http'

class Spu{
  static async getDetail(id){
    return await Http.request({
      url: `spu/id/${id}/detail`
    });
  }

  static like(id){
    return Http.request({
      url: `spu/id/${id}/like`,
      method: 'POST'
    });
  }

  static disLike(id){
    return Http.request({
      url: `spu/id/${id}/disLike`,
      method: 'POST'
    });
  }

  static async isLike(id){
    return await Http.request({
      url: `spu/id/${id}/isLike`
    });
  }

  static noSpec(spu) {
    if (spu.sku_list.length === 1 && (!spu.sku_list[0].specs || spu.sku_list[0].specs.length === 0)) {
        return true;
    }
    return false;
  }
}

export{
  Spu
}