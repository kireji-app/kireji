if (!KirejiSidebar.open.model || KirejiTabGroup.openTabs.length === 0)
 return

// Open folders if necessary to expose the active tab element.
let parentFolder = KirejiSidebar.view.getParent(KirejiTabGroup.openTabs[KirejiTabGroup.activeTabIndex].part)
let finalRID = KirejiSidebar.view.folders.rid

while (parentFolder) {
 const folderIndex = KirejiSidebar.view.folders.superset.indexOf(parentFolder)
 finalRID |= 1n << BigInt(folderIndex)
 parentFolder = KirejiSidebar.view.getParent(parentFolder)
}

if (KirejiSidebar.view.folders.rid !== finalRID)
 KirejiSidebar.view.folders.setRID(finalRID)

// Scroll to the tab if necessary.
const { top: sidebarTop, bottom: sidebarBottom } = KirejiSidebar.view.scroller.container.getBoundingClientRect()
const item = KirejiSidebar.view.scroller.container.querySelector(`[data-index="${allParts.indexOf(KirejiTabGroup.openTabs[KirejiTabGroup.activeTabIndex].part)}"]`)
const { top, bottom } = item.getBoundingClientRect()

if ((bottom > sidebarBottom) || (top < sidebarTop))
 item.scrollIntoView({ behavior: 'instant', block: 'center', })