if (typeof MODEL !== "number")
 throw error(`unsupported model type "${typeof MODEL}"`)

const resultRID = BigInt(Math.floor((((MODEL % 360) + 360) % 360) * 10))

if (resultRID >= thisGLTFGameCameraY.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisGLTFGameCameraY.cardinality}]`)

return resultRID