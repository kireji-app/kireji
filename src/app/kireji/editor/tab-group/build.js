// Memoize the permutation data.
const tabBitDepths = [0n, 0n]
const tabOffsets = [0n]
const permutationSizes = [1n]
const payloadSizes = [1n]
const subjectCount = BigInt(allSubjects.length)
const maxTabCount = 12n
const LSB = []
const powerFloor = 2n ** BigInt(subjectCount.toString(2).length - 1)
const payloadCardinality = 1n

let cardinality = 1n

for (let tabCount = 1n, permutationSize = 1n, payloadSize = 1n; tabCount <= subjectCount; tabCount++) {

 // Memoize a prototype LSB array to simplify initialization of Fenwick tree instances.
 LSB[tabCount - 1n] = tabCount & -tabCount

 if (tabCount > maxTabCount)
  continue

 // Increase the permutation size based on tab count.
 permutationSize *= subjectCount - tabCount + 1n

 // Increase the payload size.
 payloadSize *= payloadCardinality
 permutationSizes[tabCount] = permutationSize
 payloadSizes[tabCount] = payloadSize
 tabOffsets[tabCount] = cardinality

 // tabCount = range of active tab datum [0, k-1]
 // tabCount + 1n = range of preview tab datum
 cardinality +=
  (tabCount + 1n)
  * tabCount
  * permutationSize
  * payloadSize

 // Enable O(1) recovery of tabCount later.
 const bitDepth = cardinality.toString(2).length
 while (bitDepth > tabBitDepths.length)
  tabBitDepths.push(tabCount - 1n)
 tabBitDepths[bitDepth] = tabCount
}

tabGroup.define({
 cardinality: { value: cardinality },
 payloadCardinality: { value: payloadCardinality },
 permutationRouteID: { value: null, writable: true },
 payloadRouteID: { value: null, writable: true },
 activeTabIndex: { value: null, writable: true },
 previewTabIndex: { value: null, writable: true },
 viewedActiveTab: { value: null, writable: true },
 viewedPreviewTab: { value: null, writable: true },
 viewedPermutationRouteID: { value: null, writable: true },
 viewedPayloadRouteID: { value: null, writable: true },
 viewedOpenTabs: { value: null, writable: true },
 openTabs: { value: [] },
 tabOffsets: { value: tabOffsets },
 tabBitDepths: { value: tabBitDepths },
 permutationSizes: { value: permutationSizes },
 payloadSizes: { value: payloadSizes },
 maxTabCount: { value: maxTabCount },
 tree: { value: null, writable: true },
 container: { value: null, writable: true }
})