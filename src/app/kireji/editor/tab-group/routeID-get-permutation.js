const numberOfTabsOpen = BigInt(TABS.length)

// Prepare an empty Fenwick tree for converting absolute indices to availability-based indices.
tabGroup.tree = new FenwickTree(BigInt(allSubjects.length))

// Compile the array of unranked indices into a single permutation identifier.
let permutationRouteID = 0n
for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

 // Get the absolute tab subject index.
 const { part, filename } = TABS[Number(currentTabIndex)]
 const trueIndexOfActiveTabSubject = BigInt(subjectIndices.get(part.host + (filename ? "/" + filename : "")))

 // Use the Fenwick tree to obtain the availability-based index of the tab subject in the list of remaining subjects.
 const availabilityIndexOfActiveTabSubject = tabGroup.tree.query(trueIndexOfActiveTabSubject - 1n)

 // Consume that index of the Fenwick tree in preparation for the next iteration.
 tabGroup.tree.update(trueIndexOfActiveTabSubject, -1n)

 // Use mix-based logic to compile this index with the rest.
 const permutationFactorOfCurrentTabIndex = tabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
 permutationRouteID += availabilityIndexOfActiveTabSubject * permutationFactorOfCurrentTabIndex
}

return permutationRouteID