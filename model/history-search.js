class HistorySearch {
  static MAX_ITEM_COUNT = 10
  static KEY = "keywords"

  keywords = []

  constructor() {
      this.keywords = this._getLocalKeywords()
  }

  save(keyWord) {
      const itmes = this.keywords.filter(k => {
          return k === keyWord
      })
      if (itmes.length !== 0) {
          return
      }
      if (this.keywords.length >= HistorySearch.MAX_ITEM_COUNT) {
          this.keywords.pop()
      }
      this.keywords.unshift(keyWord)
      this._refreshLocal()
  }
  get() {
      return this.keywords
  }

  clear() {
      this.keywords = []
      this._refreshLocal()
  }

  _refreshLocal() {
      wx.setStorageSync(HistorySearch.KEY, this.keywords);
  }

  _getLocalKeywords() {
      const keywords = wx.getStorageSync(HistorySearch.KEY)
      return keywords ? keywords : []
  }
}

export {
  HistorySearch
}