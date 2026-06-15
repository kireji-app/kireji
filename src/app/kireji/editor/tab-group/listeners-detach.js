if (KirejiTabGroup.viewedActiveTab?.subject.kind === "part" && KirejiTabGroup.viewedActiveTab.subject.isInstance) {
 KirejiTabGroup.viewedActiveTab.subject.detach("add", KirejiTabGroup, "listener")
 KirejiTabGroup.viewedActiveTab.subject.detach("update", KirejiTabGroup, "listener")
 KirejiTabGroup.viewedActiveTab.subject.detach("remove", KirejiTabGroup, "listener")
}