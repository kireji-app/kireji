
/* TODO:
 * 1. Instantiate a concrete innstance of an abstract part per-instance. Offload all per-instance logic there.
 *    - Such a part will have optional subparts 'instance' and 'meta'
 *    - "instance" corresponds to each instance part's statically-sized data model
 *      - which also receives its specific subject assigment from the outside (not part of it's route ID)
 *    - "meta" (name pending) corresponds to a non-instance-specific part whose cardinality is dependant upon the number of instances.
 *      - get its implementation details by generalizing the active and preview tab data in the tab group. 
 *      - At build time, the parent permutation will need to be able to query this part to get its cardinality once for every instance up to the max count.
 *      - This part can support mixes, matches, etc. and might even be the ideal place to place a sub-permutation.
 * 2. Convert the tab group to use this abstract type.
 * Considerations;
 * - How do we inspect the states of existing tab instances in `kireji.app`?
 *   - Files will be easy: they are part of the abstract.
 *   - Perhaps the state space box depicts an array of instance space states instead of the single state? Perhaps that is all that is needed?
 *   - Then, how do we depict the states of subparts of the parent part? Do we simply have an array for the entire instance part's tree?
 *   - We might need "push", "pop", "insert", "splice" and/or similar array methods to make it easier to modify the instance set on the fly. */

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
 viewedPayloadRouteID: { value: null, writable: true },

 instances: { value: [] },
 viewedInstances: { value: null, writable: true },

 tree: { value: null, writable: true },
 FenwickTree: {
  value: class FenwickTree {
   constructor() {
    this.tree = [...LSB]
   }
   update(i, val) {
    for (; i < supersetSize; i += LSB[i])
     this.tree[i] += val
   }
   query(i) {
    let sum = 0n
    for (; i >= 0n; i -= LSB[i])
     sum += this.tree[i]
    return sum
   }
   findNthAvailable(n) {
    let nthAvailable = 0n
    for (let p = powerFloor; p > 0n; p /= 2n) {
     const i = nthAvailable + p
     if (i <= supersetSize && this.tree[i - 1n] <= n) {
      n -= this.tree[i - 1n]
      nthAvailable = i
     }
    }
    return nthAvailable
   }
  }
 }
})