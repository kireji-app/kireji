const instanceCount = BigInt(INSTANCES.length)

// Prepare an empty Fenwick tree for converting absolute indices to availability-based indices.
permutation.tree = new FenwickTree(permutation.superset.length)

// Compile the array of unranked indices into a single permutation identifier.
let permutationRouteID = 0n
for (let currentInstanceIndex = 0n; currentInstanceIndex < instanceCount; currentInstanceIndex++) {

 // Get the absolute instance subject index.
 const trueIndexOfActiveInstanceSubject = BigInt(permutation.superset.indexOf(permutation.instanceToSubject(INSTANCES[currentInstanceIndex])))

 // Use the Fenwick tree to obtain the availability-based index of the tab subject in the list of remaining subjects.
 const availabilityIndexOfActiveInstanceSubject = permutation.tree.query(trueIndexOfActiveInstanceSubject - 1n)

 // Consume that index of the Fenwick tree in preparation for the next iteration.
 permutation.tree.update(trueIndexOfActiveInstanceSubject, -1n)

 // Use mix-based logic to compile this index with the rest.
 const permutationFactorOfCurrentInstanceIndex = permutation.getPermutationFactor(instanceCount, currentInstanceIndex)
 permutationRouteID += availabilityIndexOfActiveInstanceSubject * permutationFactorOfCurrentInstanceIndex
}

return permutationRouteID