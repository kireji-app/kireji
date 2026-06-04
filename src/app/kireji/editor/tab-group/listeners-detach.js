if (KirejiTabGroup.viewedActiveTab && !KirejiTabGroup.viewedActiveTab.filename && !KirejiTabGroup.viewedActiveTab.part.isAbstract) {
 KirejiTabGroup.viewedActiveTab.part.detach("add", KirejiTabGroup, "listener")
 KirejiTabGroup.viewedActiveTab.part.detach("update", KirejiTabGroup, "listener")
 KirejiTabGroup.viewedActiveTab.part.detach("remove", KirejiTabGroup, "listener")
}