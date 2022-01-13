import {Http} from './http'

class Paging{
  req;
  start;
  count;
  locker = false;
  moreData = true;
  initialUrl;
  accumulator = [];
  constructor(req, count = 10, start = 0){
    this.req = req;
    this.count = count;
    this.start = start;
    this.initialUrl = req.url;
  }
  async applyMoreData(){
    if(!this.moreData){
      return;
    }
    if(!this._getLocker()){
      return;
    }
    const data = await this._actualApplyData();
    this._releaseLocker();
    return data;
  }
  async _actualApplyData(){
    this._updateReq();
    let data = await Http.request({
      url: this.req.url
    });
    if (data.totalPage === 0) {
      return {
          empty: true,
          items: [],
          moreData: false,
          accumulator: []
      }
    }
    this.moreData = this._hasMoreData(data.page, data.total_page);
    if(this.moreData){
      this.start += this.count;
    }
    this._accumulate(data.items)
    return {
        empty: false,
        items: data.items,
        moreData: this.moreData,
        accumulator: this.accumulator
    }
  }
  _accumulate(items){
    this.accumulator = this.accumulator.concat(items);
  }
  _hasMoreData(page, totalPage){
    return page < totalPage - 1;
  }

  _updateReq(){
    let url;
    if(this.initialUrl.includes('?')){
      url = `${this.initialUrl}&start=${this.start}&count=${this.count}`;
    }else{
      url = `${this.initialUrl}?start=${this.start}&count=${this.count}`;
    }
    this.req.url = url;
  }
  
  _getLocker(){
    if(this.locker){
      return false;
    }
    this.locker = true;
    return true;
  }

  _releaseLocker(){
    this.locker = false;
  }
}

export{
  Paging
}