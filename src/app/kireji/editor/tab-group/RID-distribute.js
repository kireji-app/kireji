KirejiTabGroup.updateRID(NEW_RID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

// Extract the number of open tabs.
const numberOfTabsOpen = (() => {
 let estimate = KirejiTabGroup.tabBitDepths[NEW_RID.toString(2).length]
 if (NEW_RID < KirejiTabGroup.tabOffsets[estimate])
  estimate--
 else if (NEW_RID >= KirejiTabGroup.tabOffsets[estimate + 1n])
  estimate++
 NEW_RID -= KirejiTabGroup.tabOffsets[estimate]
 return estimate
})()

// Extract the per-tab payload data.
let payloadRID = NEW_RID % KirejiTabGroup.payloadSizes[numberOfTabsOpen]
NEW_RID /= KirejiTabGroup.payloadSizes[numberOfTabsOpen]

// Extract the permutation data.
let permutationRID = NEW_RID % KirejiTabGroup.permutationSizes[numberOfTabsOpen]
NEW_RID /= KirejiTabGroup.permutationSizes[numberOfTabsOpen]

// Extract the index of the active tab.
KirejiTabGroup.activeTabIndex = numberOfTabsOpen === 0n ? null : Number(NEW_RID % numberOfTabsOpen)
NEW_RID /= (numberOfTabsOpen === 0n ? 1n : numberOfTabsOpen)

// Extract the index of the preview tab.
KirejiTabGroup.previewTabIndex = NEW_RID === numberOfTabsOpen ? null : Number(NEW_RID)

// Conditionally extract the file data for each of the open tabs.
if (numberOfTabsOpen !== KirejiTabGroup.openTabs.length || KirejiTabGroup.permutationRID !== permutationRID || KirejiTabGroup.payloadRID !== payloadRID) {

 // Cache the permutation RID to avoid unnecessarily repeating this expensive operation.
 KirejiTabGroup.permutationRID = permutationRID
 KirejiTabGroup.payloadRID = payloadRID

 // Prepare an empty Fenwick tree for converting availability-based indices to absolute indices.
 KirejiTabGroup.tree = new FenwickTree(BigInt(allSubjects.length))

 const indexOfLastOpenTab = numberOfTabsOpen - 1n
 const indexOfLastPossibleTabSubject = BigInt(allSubjects.length) - 1n

 for (let currentTabIndex = 0n; currentTabIndex < numberOfTabsOpen; currentTabIndex++) {

  // Use mix-based logic to extract the current tab's availability-based item index.
  const permutationFactorOfCurrentTabIndex = KirejiTabGroup.getPermutationFactor(numberOfTabsOpen, currentTabIndex)
  const availabilityIndexOfActiveTabSubject = permutationRID / permutationFactorOfCurrentTabIndex
  permutationRID %= permutationFactorOfCurrentTabIndex

  // Use the Fenwick tree to obtain the true index of the tab subject in the list of all subjects.
  const trueIndexOfActiveTabSubject = KirejiTabGroup.tree.findNthAvailable(availabilityIndexOfActiveTabSubject)

  // Consume that index of the Fenwick tree in preparation for the next iteration.
  KirejiTabGroup.tree.update(trueIndexOfActiveTabSubject, -1n)

  // Use mix-based logic to extract the current tab's data payload.
  const payload = payloadRID % KirejiTabGroup.payloadCardinality
  payloadRID /= KirejiTabGroup.payloadCardinality

  // Match the subject index with the actual subject.
  const [host, filename] = allSubjects[Number(trueIndexOfActiveTabSubject)]
  KirejiTabGroup.openTabs[currentTabIndex] = {
   part: lookup(host),
   filename,
   payload
  }
 }

 // Prune extra tab models.
 while (numberOfTabsOpen < KirejiTabGroup.openTabs.length)
  KirejiTabGroup.openTabs.pop()
}