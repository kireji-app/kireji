if (typeof MODEL !== "object")
 throw error(`unsupport model type "${typeof MODEL}"`)

const keys = Object.keys(MODEL)

if (!keys.length)
 return 0n

let resultRID = 0n

for (const key of keys) {
 const factor = thisMix[key]

 if (!factor) {
  warn(error(`can't find factor ${key}`))
  continue
 }
 try {
  resultRID += factor.modelToRID(MODEL[key]) * thisMix.placeValues.get(factor)
 } catch (e) {
  warn(e)
 }
}

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID