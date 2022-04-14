import {Http} from '../utils/http'

class Category{
  static async getHomeLocation3(){
    return await Http.request({
      url: "category/grid"
    });
  }
}

export {
  Category
}