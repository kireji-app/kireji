if (KirejiTabGroup.activeTab?.subject.kind === "part" && KirejiTabGroup.activeTab.subject.isInstance) {
 KirejiTabGroup.activeTab.subject.attach("add", KirejiTabGroup, "listener")
 KirejiTabGroup.activeTab.subject.attach("update", KirejiTabGroup, "listener")
 KirejiTabGroup.activeTab.subject.attach("remove", KirejiTabGroup, "listener")
}