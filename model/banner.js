import {Http} from '../utils/http'

class Banner{
  static bannerA = 'b-1';
  static bannerB = 'b-2';
  static async getHomeLocation2(){
    return await Http.request({
      url: `banner/name/${Banner.bannerA}`,
    });
  }
  static async getHomeLocation7(){
    return await Http.request({
      url: `banner/name/${Banner.bannerB}`,
    });
  }
}

export{
  Banner
}