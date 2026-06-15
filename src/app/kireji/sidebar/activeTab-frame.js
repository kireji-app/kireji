if (!KirejiSidebar.open.model || KirejiTabGroup.openTabs.length === 0)
 return

const openTabSubject = KirejiTabGroup.activeTab.subject
const currentNode = KirejiSidebar.view.folderMask.nodesBySubject.get(allParts[openTabSubject.partIndex])
// Open folders if necessary to expose the active tab element.
let parentNode = currentNode.parentNode
let finalRID = KirejiSidebar.view.folderMask.rid

while (parentNode) {
 finalRID |= 1n << BigInt(parentNode.maskIndex)
 parentNode = parentNode.parentNode
}

if (KirejiSidebar.view.folderMask.rid !== finalRID)
 KirejiSidebar.view.folderMask.setRID(finalRID)

// Scroll to the tab if necessary.
const { top: sidebarTop, bottom: sidebarBottom } = KirejiSidebar.view.scroller.container.getBoundingClientRect()
const item = KirejiSidebar.view.scroller.container.querySelector(`[data-index="${openTabSubject.partIndex}"]`)
const { top, bottom } = item.getBoundingClientRect()

if ((bottom > sidebarBottom) || (top < sidebarTop))
 item.scrollIntoView({ behavior: 'instant', block: 'center', })