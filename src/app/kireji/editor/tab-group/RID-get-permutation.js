const numberOfTabsOpen = BigInt(TABS.length)

// Prepare an empty Fenwick tree for converting absolute indices to availability-based indices.
KirejiTabGroup.tree = new FenwickTree(BigInt(allSubjects.length))

// Compile the array of unranked indices into a single permutation identifier.
let permutationRID = 0n
for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

 // Get the absolute tab subject index.
 const { part, filename } = TABS[Number(currentTabIndex)]
 const subjectKey = part.host + (filename ? "/" + filename : "")
 const subjectIndex = subjectIndices.get(subjectKey)
 if (!subjectIndex)
  throw error(`the subject "${subjectKey}" is not in the all subjects array`)
 const trueIndexOfActiveTabSubject = BigInt(subjectIndex)

 // Use the Fenwick tree to obtain the availability-based index of the tab subject in the list of remaining subjects.
 const availabilityIndexOfActiveTabSubject = KirejiTabGroup.tree.query(trueIndexOfActiveTabSubject - 1n)

 // Consume that index of the Fenwick tree in preparation for the next iteration.
 KirejiTabGroup.tree.update(trueIndexOfActiveTabSubject, -1n)

 // Use mix-based logic to compile this index with the rest.
 const permutationFactorOfCurrentTabIndex = KirejiTabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
 permutationRID += availabilityIndexOfActiveTabSubject * permutationFactorOfCurrentTabIndex
}

return permutationRID