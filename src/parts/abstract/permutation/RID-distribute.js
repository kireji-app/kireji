thisPermutation.updateRID(NEW_RID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

// Extract the number of instances.
const instanceCount = (() => {
 let estimate = thisPermutation.instanceBitDepths[NEW_RID.toString(2).length]
 if (NEW_RID < thisPermutation.instanceOffsets[estimate])
  estimate--
 else if (NEW_RID >= thisPermutation.instanceOffsets[estimate + 1n])
  estimate++
 NEW_RID -= thisPermutation.instanceOffsets[estimate]
 return estimate
})()

// Extract the per-instance payload data.
let payloadRID = NEW_RID % thisPermutation.payloadSizes[instanceCount]
NEW_RID /= thisPermutation.payloadSizes[instanceCount]

// Extract the thisPermutation data.
let permutationRID = NEW_RID % thisPermutation.permutationSizes[instanceCount]
NEW_RID /= thisPermutation.permutationSizes[instanceCount]

// Conditionally extract the data about the instance thisPermutation.
if (instanceCount !== thisPermutation.instances.length || thisPermutation.permutationRID !== permutationRID || thisPermutation.payloadRID !== payloadRID) {

 // Cache the thisPermutation RID to avoid unnecessarily repeating this expensive operation.
 thisPermutation.permutationRID = permutationRID
 thisPermutation.payloadRID = payloadRID

 // Prepare an empty Fenwick tree for converting availability-based indices to absolute indices.
 thisPermutation.tree = new FenwickTree(BigInt(thisPermutation.superset.length))

 for (let currentInstanceIndex = 0n; currentInstanceIndex < instanceCount; currentInstanceIndex++) {

  // Use mix-based logic to extract the current instances's availability-based subject index.
  const permutationFactorOfCurrentInstanceIndex = thisPermutation.getPermutationFactor(instanceCount, currentInstanceIndex)
  const availabilityIndexOfActiveInstanceSubject = permutationRID / permutationFactorOfCurrentInstanceIndex
  permutationRID %= permutationFactorOfCurrentInstanceIndex

  // Use the Fenwick tree to obtain the true index of the instance's subject in the list of all subjects.
  const trueIndexOfActiveInstanceSubject = thisPermutation.tree.findNthAvailable(availabilityIndexOfActiveInstanceSubject)

  // Consume that index of the Fenwick tree in preparation for the next iteration.
  thisPermutation.tree.update(trueIndexOfActiveInstanceSubject, -1n)

  // Use mix-based logic to extract the current instances's data payload.
  const instanceRID = payloadRID % thisPermutation.payloadCardinality
  payloadRID /= thisPermutation.payloadCardinality

  thisPermutation.instances[currentInstanceIndex] = thisPermutation.distributeInstanceRID(trueIndexOfActiveInstanceSubject, instanceRID)
 }

 // Prune extra instances.
 while (instanceCount < thisPermutation.instances.length)
  thisPermutation.instances.pop()
}