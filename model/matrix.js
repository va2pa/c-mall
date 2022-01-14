class Matrix{
  m;
  constructor(matrix){
    this.m = matrix;
  }

  get rows(){
    return this.m.length
  }

  get cols(){
    return this.m[0].length
  }

  forEach(callback){
    for(let j = 0; j < this.cols; j++){
      for(let i = 0; i < this.rows; i++){
        callback(this.m[i][j], i, j);
      }
    }
  }

  transpose(){
    const distArr = [];
    for(let i = 0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        if(i === 0){
          distArr[j] = [];
        }
        distArr[j][i] = this.m[i][j];
      }
    }
    return distArr;
  }
}

export{
  Matrix
}