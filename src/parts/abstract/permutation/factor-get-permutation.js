const indexOfLastPossibleInstanceSubject = permutation.supersetSize - 1n
const indexOfLastInstance = INSTANCE_COUNT - 1n

let permutationFactorOfCurrentInstanceIndex = 1n

for (let consumedInstanceIndices = 0n; consumedInstanceIndices < indexOfLastInstance - CURRENT_INSTANCE_INDEX; consumedInstanceIndices++)
 permutationFactorOfCurrentInstanceIndex *= indexOfLastPossibleInstanceSubject - CURRENT_INSTANCE_INDEX - consumedInstanceIndices

return permutationFactorOfCurrentInstanceIndex