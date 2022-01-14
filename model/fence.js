class Fence{
  values = [];

  constructor(specs){
    // specs:
    // [{key_id: 1, key: "颜色", value_id: 45, value: "金属灰"},
    // {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"},
    // {key_id: 1, key: "颜色", value_id: 42, value: "青芒色"},
    // {key_id: 1, key: "颜色", value_id: 44, value: "橘黄色"}]
    this.specs = specs;
  }
  initValues(){
    this.specs.forEach(spec => {
      this.values.push(spec.value);
    });
  }
  pushValues(title){
    this.values.push(title);
  }
}

export{
  Fence
}