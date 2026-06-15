const instanceCount = BigInt(INSTANCES.length)

// Prepare an empty Fenwick tree for converting absolute indices to availability-based indices.
const fenwick = KMath.createFenwickTree(BigInt(thisPermutation.superset.length))

// Compile the array of unranked indices into a single thisPermutation identifier.
let permutationRID = 0n
for (let currentInstanceIndex = 0n; currentInstanceIndex < instanceCount; currentInstanceIndex++) {

 // Get the absolute instance subject index.
 const trueIndexOfActiveInstanceSubject = BigInt(thisPermutation.superset.indexOf(thisPermutation.instanceToSubject(INSTANCES[currentInstanceIndex])))

 // Use the Fenwick tree to obtain the availability-based index of the tab subject in the list of remaining subjects.
 const availabilityIndexOfActiveInstanceSubject = fenwick.partialSum(trueIndexOfActiveInstanceSubject - 1n)

 // Consume that index of the Fenwick tree in preparation for the next iteration.
 fenwick.remove(trueIndexOfActiveInstanceSubject)

 // Use mix-based logic to compile this index with the rest.
 const permutationFactorOfCurrentInstanceIndex = thisPermutation.getPermutationFactor(instanceCount, currentInstanceIndex)
 permutationRID += availabilityIndexOfActiveInstanceSubject * permutationFactorOfCurrentInstanceIndex
}

return permutationRID