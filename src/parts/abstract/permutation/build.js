// Memoize the permutation data.
const instanceOffsets = [0n]
const instanceBitDepths = [0n, 0n]
const permutationSizes = [1n]
const payloadCardinality = 2000n ** 4n
const payloadSizes = [1n]
const superset = permutation.getSuperset()
const supersetSize = BigInt(superset.length)
const maxInstanceCount = supersetSize
const LSB = []
const powerFloor = 2n ** BigInt(supersetSize.toString(2).length - 1)

let cardinality = 1n

for (let subsetSize = 1n, permutationSize = 1n, payloadSize = 1n; subsetSize <= supersetSize; subsetSize++) {

 // Memoize a prototype LSB array to simplify initialization of Fenwick tree instances.
 LSB[subsetSize - 1n] = subsetSize & -subsetSize

 if (subsetSize > maxInstanceCount)
  continue

 // Increase the permutation size based on subset size.
 permutationSize *= supersetSize - subsetSize + 1n

 // Increase the payload size.
 payloadSize *= payloadCardinality
 permutationSizes[subsetSize] = permutationSize
 payloadSizes[subsetSize] = payloadSize
 instanceOffsets[subsetSize] = cardinality

 cardinality +=
  permutationSize
  * payloadSize

 // Enable O(1) recovery of subsetSize later.
 const bitDepth = cardinality.toString(2).length
 while (bitDepth > instanceBitDepths.length)
  instanceBitDepths.push(subsetSize - 1n)
 instanceBitDepths[bitDepth] = subsetSize
}

permutation.define({
 instanceOffsets: { value: instanceOffsets },
 instanceBitDepths: { value: instanceBitDepths },
 permutationSizes: { value: permutationSizes },
 payloadCardinality: { value: payloadCardinality },
 payloadSizes: { value: payloadSizes },
 superset: { value: superset },
 supersetSize: { value: supersetSize },
 maxInstanceCount: { value: maxInstanceCount },

 cardinality: { value: cardinality },

 permutationRouteID: { value: null, writable: true },
 viewedPermutationRouteID: { value: null, writable: true },

 payloadRouteID: { value: null, writable: true },

 instances: { value: [] },
 viewedInstances: { value: null, writable: true },

 tree: { value: null, writable: true }
})