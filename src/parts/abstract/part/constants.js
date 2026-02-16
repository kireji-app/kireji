const part = this
const property = Property[PROPERTY_ID]
const recurse = (...args) => part[property.niceName].call(part, ...args)
const base = (...args) => prototype?.[property.niceName].call(part, ...args)