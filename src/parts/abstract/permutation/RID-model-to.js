const validInstances = []

for (let i = 0n; i < MODEL.instances.length; i++) {
 try {
  validInstances.push(thisPermutation.instanceFromModel(MODEL.instances[i]))
 } catch (e) {
  warn(e)
 }
}

const numberOfInstances = validInstances.length

const resultRID = thisPermutation.instanceOffsets[numberOfInstances] +
 thisPermutation.getPermutationRID(validInstances)
 * thisPermutation.payloadSizes[numberOfInstances]
 + thisPermutation.getPayloadRID(validInstances)

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID