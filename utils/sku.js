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

const parseSpecValues = function (values) {
    if (!values) {
        return null
    }
    const stringBuilder = new StringBuilder('; ', 2)
    values.map(value => {
      stringBuilder.append(value)
    })
    return stringBuilder.toString()
}


export {
    parseSpecs,
    parseSpecValues
}
