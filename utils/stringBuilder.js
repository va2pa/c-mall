class StringBuilder {
  _str = ''
  _symbol = '-'
  _cutCharNum = 1
  constructor(symbol, cutCharNum) {
      if (symbol) {
          this._symbol = symbol
      }
      if (cutCharNum){
          this._cutCharNum = cutCharNum
      }
  }
  append(part) {
      if (part) {
          this._str += `${part}${this._symbol}`;
      }
  }
  toString() {
      return this._str.substring(0, this._str.length - this._cutCharNum)
  }

}

export {
  StringBuilder
}