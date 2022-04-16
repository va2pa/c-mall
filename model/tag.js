import { Http } from "../utils/http"

class Tag {
    static getAllTags() {
        return Http.request({
            url: 'tag/all'
        })
    }

}
export {
    Tag
}