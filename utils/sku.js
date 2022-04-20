import { StringBuilder } from "./stringBuilder";

const parseSpecs = function (specs) {
    if (!specs) {
        return null
    }
    const stringBuilder = new StringBuilder('; ', 2)
    specs.map(spec => {
      stringBuilder.append(spec.value)
    })
    return stringBuilder.toString()
}


export {
    parseSpecs
}
