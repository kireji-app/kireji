if (typeof MODEL !== "string")
 throw error(`unsupported model type "${typeof MODEL}"`)

const resultRID = RID.fromHash(MODEL)

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID