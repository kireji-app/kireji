setUndoPoint()

thisPermutation.permutationRID = thisPermutation.getPermutationRID(thisPermutation.instances)
thisPermutation.payloadRID = thisPermutation.getPayloadRID(thisPermutation.instances)

const
 instanceCount = thisPermutation.instances.length,
 summarizedRID = thisPermutation.instanceOffsets[instanceCount] +
  thisPermutation.permutationRID
  * thisPermutation.payloadSizes[instanceCount]
  + thisPermutation.payloadRID

if (thisPermutation.rid !== summarizedRID)
 thisPermutation.setRID(summarizedRID)