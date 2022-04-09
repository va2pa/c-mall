import {combination} from '../utils/util'
class SkuCode{
  code;
  spuId;
  segments = [];
  constructor(code){
    this.code = code;
    this._splitToSegments();
  }
  _splitToSegments(){
    const spuAndSpec = this.code.split('$');
    this.spuId = spuAndSpec[0];
    const specCodeArray = spuAndSpec[1].split('#');
    for(let i = 1; i <= specCodeArray.length; i++){
      // i==1: [["1-45"], ["3-9"], ["4-14"]]

      // i==2: [["1-45", "3-9"], ["1-45", "4-14"], ["3-9", "4-14"]]

      // i==3: [["1-45", "3-9", "4-14"]]
      const ss = combination(specCodeArray, i); //二维数组
      const newSeg = ss.map(s => {
        // console.log(s);
        return s.join('#'); //一维数组转字符串
      });
      this.segments = this.segments.concat(newSeg);
      // console.log(newSeg);
    }
  }
}

export{
  SkuCode
}