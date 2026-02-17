tabGroup.viewedActiveTab = tabGroup.activeTab
tabGroup.viewedPreviewTab = tabGroup.previewTab
tabGroup.viewedPermutationRouteID = tabGroup.permutationRouteID
tabGroup.viewedPayloadRouteID = tabGroup.payloadRouteID
tabGroup.viewedOpenTabs = [...tabGroup.openTabs]
tabGroup.container = Q("#tab-group")
tabGroup.attachListeners()
Q(`tab-[data-active]`)?.scrollIntoView({
 behavior: 'smooth',
 inline: 'nearest',
})