Pointer.handle({
 click() {
  const tabIndex = Array.prototype.indexOf.call(Q("#tab-group").children, TARGET_ELEMENT.parentElement)
  KirejiTabGroup.openTabs.splice(tabIndex, 1)
  KirejiTabGroup.activeTabIndex = KirejiTabGroup.openTabs.length === 0 ? null : (KirejiTabGroup.activeTabIndex === tabIndex ? (KirejiTabGroup.activeTabIndex < 1 ? 0 : KirejiTabGroup.activeTabIndex - 1) : (KirejiTabGroup.activeTabIndex > tabIndex ? KirejiTabGroup.activeTabIndex - 1 : KirejiTabGroup.activeTabIndex))
  KirejiTabGroup.previewTabIndex = KirejiTabGroup.openTabs.length === 0 || KirejiTabGroup.previewTabIndex === tabIndex ? null : (KirejiTabGroup.previewTabIndex > tabIndex ? KirejiTabGroup.previewTabIndex - 1 : KirejiTabGroup.previewTabIndex)
  KirejiTabGroup.recomputeRID(true)
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})