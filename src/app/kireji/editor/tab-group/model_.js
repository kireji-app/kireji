return {
 activeTabIndex: KirejiTabGroup.activeTabIndex,
 previewTabIndex: KirejiTabGroup.previewTabIndex,
 openTabs: KirejiTabGroup.openTabs.map(({ part, filename, payload }) => ({ host: part.host, filename, payload: Number(payload) }))
}