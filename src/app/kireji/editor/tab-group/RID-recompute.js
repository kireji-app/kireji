setUndoPoint()

if (RECOMPUTE_OPEN_TABS) {
 KirejiTabGroup.permutationRID = KirejiTabGroup.getPermutationRID(KirejiTabGroup.openTabs)
 KirejiTabGroup.payloadRID = KirejiTabGroup.getPayloadRID(KirejiTabGroup.openTabs)
}

const
 numberOfTabsOpen = KirejiTabGroup.openTabs.length,
 previewTabRID = numberOfTabsOpen > 0 ? (KirejiTabGroup.previewTabIndex === null ? BigInt(numberOfTabsOpen) : BigInt(KirejiTabGroup.previewTabIndex ?? numberOfTabsOpen)) : 0n,
 activeTabRID = (numberOfTabsOpen > 0 ? BigInt(KirejiTabGroup.activeTabIndex) : 0n),
 summarizedRID = KirejiTabGroup.tabOffsets[numberOfTabsOpen] +
  (
   (
    previewTabRID
    * BigInt(numberOfTabsOpen)
    + activeTabRID
   )
   * KirejiTabGroup.permutationSizes[numberOfTabsOpen]
   + KirejiTabGroup.permutationRID
  )
  * KirejiTabGroup.payloadSizes[numberOfTabsOpen]
  + KirejiTabGroup.payloadRID

if (KirejiTabGroup.rid !== summarizedRID) {
 const isChangingActiveTab = KirejiTabGroup.viewedActiveTab !== KirejiTabGroup.activeTab
 KirejiTabGroup.detachListeners()
 KirejiTabGroup.setRID(summarizedRID)
 if (isChangingActiveTab) {
  KirejiEditor.scroller.scrollToTop()
  KirejiSidebar.frameActiveTab()
 }
}