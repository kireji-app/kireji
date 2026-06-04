KirejiTabGroup.viewedActiveTab = KirejiTabGroup.activeTab
KirejiTabGroup.viewedPreviewTab = KirejiTabGroup.previewTab
KirejiTabGroup.viewedPermutationRID = KirejiTabGroup.permutationRID
KirejiTabGroup.viewedPayloadRID = KirejiTabGroup.payloadRID
KirejiTabGroup.viewedOpenTabs = [...KirejiTabGroup.openTabs]
KirejiTabGroup.container = Q("#tab-group")
KirejiTabGroup.attachListeners()
Q(`tab-[data-active]`)?.scrollIntoView({
 behavior: 'smooth',
 inline: 'nearest',
})