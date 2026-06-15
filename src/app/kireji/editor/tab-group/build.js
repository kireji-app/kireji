define(KirejiTabGroup, {
 openTabs: {
  value: []
 },
 tabOffsets: {
  value: [0n]
 },
 tabBitDepths: {
  value: [0n, 0n]
 },
 permutationSizes: {
  value: [1n]
 },
 payloadSizes: {
  value: [1n]
 },
 payloadCardinality: {
  value: 1n
 },
 maxTabCount: {
  value: 12n
 },
 cardinality: {
  resolve() {
   // Memoize the permutation data.
   const subjectCount = BigInt(allSubjects.length)

   let cardinality = 1n

   for (let tabCount = 1n, permutationSize = 1n, payloadSize = 1n; tabCount <= subjectCount; tabCount++) {

    if (tabCount > this.maxTabCount)
     continue

    // Increase the permutation size based on tab count.
    permutationSize *= subjectCount - tabCount + 1n

    // Increase the payload size.
    payloadSize *= this.payloadCardinality
    this.permutationSizes[tabCount] = permutationSize
    this.payloadSizes[tabCount] = payloadSize
    this.tabOffsets[tabCount] = cardinality

    // tabCount = range of active tab datum [0, k-1]
    // tabCount + 1n = range of preview tab datum
    cardinality +=
     (tabCount + 1n)
     * tabCount
     * permutationSize
     * payloadSize

    // Enable O(1) recovery of tabCount later.
    const bitDepth = cardinality.toString(2).length
    while (bitDepth > this.tabBitDepths.length)
     this.tabBitDepths.push(tabCount - 1n)
    this.tabBitDepths[bitDepth] = tabCount
   }

   return cardinality
  }
 },
 permutationRID: {
  value: null,
  writable: true
 },
 payloadRID: {
  value: null,
  writable: true
 },
 activeTabIndex: {
  value: null,
  writable: true
 },
 previewTabIndex: {
  value: null,
  writable: true
 },
 viewedActiveTab: {
  value: null,
  writable: true
 },
 viewedPreviewTab: {
  value: null,
  writable: true
 },
 viewedPermutationRID: {
  value: null,
  writable: true
 },
 viewedPayloadRID: {
  value: null,
  writable: true
 },
 viewedOpenTabs: {
  value: null,
  writable: true
 },
 container: {
  value: null,
  writable: true
 }
})