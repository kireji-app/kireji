permutation.updateRouteID(ROUTE_ID)

// Extract the number of instances.
const instanceCount = (() => {
 let estimate = permutation.instanceBitDepths[ROUTE_ID.toString(2).length]
 if (ROUTE_ID < permutation.instanceOffsets[estimate])
  estimate--
 else if (ROUTE_ID >= permutation.instanceOffsets[estimate + 1n])
  estimate++
 ROUTE_ID -= permutation.instanceOffsets[estimate]
 return estimate
})()

// Extract the per-instance payload data.
let payloadRouteID = ROUTE_ID % permutation.payloadSizes[instanceCount]
ROUTE_ID /= permutation.payloadSizes[instanceCount]

// Extract the permutation data.
let permutationRouteID = ROUTE_ID % permutation.permutationSizes[instanceCount]
ROUTE_ID /= permutation.permutationSizes[instanceCount]

// Conditionally extract the data about the instance permutation.
if (instanceCount !== permutation.instances.length || permutation.permutationRouteID !== permutationRouteID || permutation.payloadRouteID !== payloadRouteID) {

 // Cache the permutation route ID to avoid unnecessarily repeating this expensive operation.
 permutation.permutationRouteID = permutationRouteID
 permutation.payloadRouteID = payloadRouteID

 // Prepare an empty Fenwick tree for converting availability-based indices to absolute indices.
 permutation.tree = new permutation.FenwickTree()

 const indexOfLastInstance = instanceCount - 1n
 const indexOfLastPossibleInstanceSubject = BigInt(permutation.superset.length) - 1n

 for (let currentInstanceIndex = 0n; currentInstanceIndex < instanceCount; currentInstanceIndex++) {

  // Use mix-based logic to extract the current instances's availability-based subject index.
  const permutationFactorOfCurrentInstanceIndex = permutation.getPermutationFactor(instanceCount, currentInstanceIndex)
  const availabilityIndexOfActiveInstanceSubject = permutationRouteID / permutationFactorOfCurrentInstanceIndex
  permutationRouteID %= permutationFactorOfCurrentInstanceIndex

  // Use the Fenwick tree to obtain the true index of the instance's subject in the list of all subjects.
  const trueIndexOfActiveInstanceSubject = permutation.tree.findNthAvailable(availabilityIndexOfActiveInstanceSubject)

  // Consume that index of the Fenwick tree in preparation for the next iteration.
  permutation.tree.update(trueIndexOfActiveInstanceSubject, -1n)

  // Use mix-based logic to extract the current instances's data payload.
  const instanceRouteID = payloadRouteID % permutation.payloadCardinality
  payloadRouteID /= permutation.payloadCardinality

  permutation.instances[currentInstanceIndex] = permutation.distributeInstanceRouteID(trueIndexOfActiveInstanceSubject, instanceRouteID)
 }

 // Prune extra instances.
 while (instanceCount < permutation.instances.length)
  permutation.instances.pop()
}