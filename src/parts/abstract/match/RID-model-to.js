const isString = typeof MODEL === "string"

if (!isString && typeof MODEL !== "object")
 throw error(`unsuported model type "${typeof MODEL}"`)

const keys = isString ? [MODEL] : Object.keys(MODEL)

if (!keys.length)
 return 0n

if (keys.length !== 1)
 throw error(`multiple key assignments not supported\n\t"${keys.join('"\n\t"')}"`)

const key = keys[0]
const arm = thisMatch[key]


if (!thisMatch.subparts.includes(arm))
 throw error(`no subpart called "${key}"\n\tAvailable subparts:\n\t"${thisMatch.subparts.map(subpart => subpart.key).join('"\n\t"')}"`)

const resultRID = thisMatch.offsets.get(arm) + (isString ? 0n : arm.modelToRID(MODEL[key]))

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID