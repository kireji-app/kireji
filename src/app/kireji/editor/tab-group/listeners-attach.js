if (tabGroup.activeTab && !tabGroup.activeTab.filename && !tabGroup.activeTab.part.isAbstract) {
 tabGroup.activeTab.part.attach("update", tabGroup, "listener")
 tabGroup.activeTab.part.attach("remove", tabGroup, "listener")
}