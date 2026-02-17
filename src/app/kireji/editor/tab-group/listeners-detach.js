if (tabGroup.viewedActiveTab && !tabGroup.viewedActiveTab.filename && !tabGroup.viewedActiveTab.part.isAbstract) {
 tabGroup.viewedActiveTab.part.detach("add", tabGroup, "listener")
 tabGroup.viewedActiveTab.part.detach("update", tabGroup, "listener")
 tabGroup.viewedActiveTab.part.detach("remove", tabGroup, "listener")
}