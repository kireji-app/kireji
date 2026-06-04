if (KirejiTabGroup.activeTab && !KirejiTabGroup.activeTab.filename && !KirejiTabGroup.activePart.isAbstract) {
 KirejiTabGroup.activePart.attach("add", KirejiTabGroup, "listener")
 KirejiTabGroup.activePart.attach("update", KirejiTabGroup, "listener")
 KirejiTabGroup.activePart.attach("remove", KirejiTabGroup, "listener")
}