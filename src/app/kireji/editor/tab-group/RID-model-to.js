const validTabs = []

let activeTabRID = BigInt(MODEL.activeTabIndex ?? 0)
let previewTabRID = BigInt(MODEL.previewTabIndex ?? MODEL.openTabs.length)

let invalidTabCount = 0n

for (let i = 0n; i < MODEL.openTabs.length; i++) {
 const { host, filename, payload } = MODEL.openTabs[i]
 const part = lookup(host)

 if (part) {
  if (filename === undefined || part.filenames.includes(filename)) {
   if (payload === undefined || typeof payload === "number") {
    if (payload === undefined || payload >= 0n && payload < KirejiTabGroup.payloadCardinality) {
     const subject = part.components[filename] ?? part
     validTabs.push({ subject, payload: payload ?? 0 })
     continue
    } else warn(error(`out of range payload ${payload} (tab ${i})`))
   } else warn(error(`unsupported payload type "${typeof payload}" (tab ${i})`))
  } else warn(error(`can't find file "${filename}" on part "${host}" (tab ${i})`))
 } else warn(error(`can't find part "${host}" (tab ${i})`))

 const invalidTabIndex = i - invalidTabCount++
 if (invalidTabIndex < activeTabRID || (activeTabRID && activeTabRID === invalidTabIndex))
  activeTabRID--
 if (invalidTabIndex < previewTabRID || (previewTabRID && previewTabRID === invalidTabIndex))
  previewTabRID--
}

const numberOfTabsOpen = validTabs.length

const resultRID = KirejiTabGroup.tabOffsets[numberOfTabsOpen] +
 (
  (
   previewTabRID
   * BigInt(numberOfTabsOpen)
   + activeTabRID
  )
  * KirejiTabGroup.permutationSizes[numberOfTabsOpen]
  + KirejiTabGroup.getPermutationRID(validTabs)
 )
 * KirejiTabGroup.payloadSizes[numberOfTabsOpen]
 + KirejiTabGroup.getPayloadRID(validTabs)

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID