import { Http } from "../utils/http"
class SpuExplain {
    static async getExplain() {
        const explains = await Http.request({
            url: `spu/explain`
        })
        return explains.map(e => {
            return e.text
        })
    }
}
export {
  SpuExplain
}