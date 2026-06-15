return {
 activeTabIndex: KirejiTabGroup.activeTabIndex,
 previewTabIndex: KirejiTabGroup.previewTabIndex,
 openTabs: KirejiTabGroup.openTabs.map(({ subject, payload }) => ({
  host: subject.kind === "part" ? subject.host : subject.owner.host,
  filename: subject.kind === "file" ? subject.key : undefined,
  payload: Number(payload)
 }))
}