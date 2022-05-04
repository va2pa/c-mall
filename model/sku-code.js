import {combination} from '../utils/util'
class SkuCode{
  code;
  spuId;
  segments = [];
  constructor(code){
    this.code = code;
    this._splitToSegments();
  }
  _splitToSegments1(){
    // sku码格式：spuId$specKeyId-specValueId#...
    const spuAndSpec = this.code.split('$');
    this.spuId = spuAndSpec[0];
    const specCodeArray = spuAndSpec[1].split('#');
    for(let i = 1; i <= specCodeArray.length; i++){
      console.log("__________________");
      const ss = combination(specCodeArray, i); //二维数组
      // i==1: ss: [["1-45"], ["3-9"], ["4-14"]]
      // i==2: ss: [["1-45", "3-9"], ["1-45", "4-14"], ["3-9", "4-14"]]
      // i==3: ss: [["1-45", "3-9", "4-14"]]
      console.log(ss);
      const newSeg = ss.map(s => {
        // console.log(s);
        return s.join('#'); //一维数组转字符串
      });
      // i==1: newSeg: ["1-45", "3-9", "4-14"]
      // i==2: newSeg: ["1-45#3-9", "1-45#4-14", "3-9#4-14"]
      // i==3: newSeg: ["1-45#3-9#4-14"]

      console.log(newSeg);
      this.segments = this.segments.concat(newSeg);
      // i==1: segments: ["1-45", "3-9", "4-14"]
      // i==2: segments: ["1-45", "3-9", "4-14","1-45#3-9", "1-45#4-14", "3-9#4-14"]
      // i==3: segments: ["1-45", "3-9", "4-14","1-45#3-9", "1-45#4-14", "3-9#4-14","1-45#3-9#4-14"]
      console.log(this.segments);
      console.log("__________________");
      // console.log(newSeg);
    }
  }

  _splitToSegments(){
    // sku码格式：spuId$specKeyId-specValueId#specKeyId-specValueId#...
    const spuAndSpec = this.code.split('$');
    this.spuId = spuAndSpec[0];
    const specCodeArray = spuAndSpec[1].split('#');
    console.log("__________________");
    console.log(specCodeArray);
    // specCodeArray: ["1-45", "3-9", "4-14"]
    const ss = combination(specCodeArray); //二维数组
    // ss: [["1-45"], ["3-9"], ["4-14"], ["1-45", "3-9"], ["1-45", "4-14"], ["3-9", "4-14"],["1-45", "3-9", "4-14"]]
    console.log(ss);
    this.segments = ss.map(s => {
      return s.join('#'); //一维数组转字符串
    });
    // segments: ["1-45", "3-9", "4-14","1-45#3-9", "1-45#4-14", "3-9#4-14","1-45#3-9#4-14"]
    console.log(this.segments);
    console.log("__________________");
    // console.log(newSeg);
  }
}

export{
  SkuCode
}