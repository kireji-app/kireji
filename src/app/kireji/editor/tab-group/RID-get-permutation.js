const numberOfTabsOpen = BigInt(TABS.length)

// Prepare an empty Fenwick tree for converting absolute indices to availability-based indices.
const fenwick = KMath.createFenwickTree(BigInt(allSubjects.length))

// Compile the array of unranked indices into a single permutation identifier.
let permutationRID = 0n
for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

 // Get the absolute tab subject index.
 const trueIndexOfActiveTabSubject = BigInt(TABS[Number(currentTabIndex)].subject.subjectIndex)

 // Use the Fenwick tree to obtain the availability-based index of the tab subject in the list of remaining subjects.
 const availabilityIndexOfActiveTabSubject = fenwick.partialSum(trueIndexOfActiveTabSubject - 1n)

 // Consume that index of the Fenwick tree in preparation for the next iteration.
 fenwick.remove(trueIndexOfActiveTabSubject)

 // Use mix-based logic to compile this index with the rest.
 const permutationFactorOfCurrentTabIndex = KirejiTabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
 permutationRID += availabilityIndexOfActiveTabSubject * permutationFactorOfCurrentTabIndex
}

return permutationRID