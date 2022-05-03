const promisic = function (func) {
  return function (params = {}) {
      return new Promise((resolve, reject) => {
          const args = Object.assign(params, {
              success: (res) => {
                  resolve(res);
              },
              fail: (error) => {
                  reject(error);
              }
          });
          func(args);
      });
  };
};

const combination = function (arr, size) {
    let r = [];
    function dfs(a,ne) {
        if(a.length === size){
            r.push(a);
            return;
        }
        if (ne === arr.length) {
            return;
        }
        for (let i = ne; i < arr.length; i++) {
            let tmp = a.slice();
            a.push(arr[i]);
            dfs(a, i + 1);
            a = tmp;
        }
    }
    dfs([], 0);
    return r;
}

export{
  promisic,
  combination
}