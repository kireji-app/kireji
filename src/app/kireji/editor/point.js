/** @type {IKirejiAppEditorPointerConfig} */
const pointerConfig = {
 activeTabIndexOfDraggedItem: Array.prototype.indexOf.call(KirejiTabGroup.container.children, TARGET_ELEMENT.parentElement),
 dragPreviewElement: null,
 dropTargetElement: TARGET_ELEMENT,
 scroller: null,
 down() {
  if (![-1, KirejiTabGroup.activeTabIndex].includes(this.activeTabIndexOfDraggedItem)) {
   KirejiTabGroup.activeTabIndex = this.activeTabIndexOfDraggedItem
   KirejiTabGroup.recomputeRID()
  }

  if (TARGET_ELEMENT.closest("outliner-"))
   this.scroller = KirejiSidebar.view.scroller
  else if (TARGET_ELEMENT.closest("editor-view"))
   this.scroller = KirejiEditor.scroller

  this.scroller?.lock()

  TARGET_ELEMENT.setAttribute("data-drop-target", "")
 },
 drag(pointerEvent) {
  let resolvedTargetDropElement = null
  let resolvedDropTargetProperty = ""

  if (inRect(pointerEvent, KirejiTabGroup.container.getBoundingClientRect())) {

   const currentElement = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY)
   if (currentElement) {
    resolvedTargetDropElement = currentElement.closest("tab-")
    if (resolvedTargetDropElement) {
     const { left: tabLeft, right: tabRight } = resolvedTargetDropElement.getBoundingClientRect()
     const center = (tabLeft + tabRight) / 2
     resolvedDropTargetProperty = center >= pointerEvent.clientX ? "before" : "after"
    } else {
     const { right: lastTabRight } = KirejiTabGroup.container.lastElementChild.getBoundingClientRect()
     if (lastTabRight > pointerEvent.clientX) {
      resolvedTargetDropElement = KirejiTabGroup.container.firstElementChild
      resolvedDropTargetProperty = "before"
     } else {
      resolvedTargetDropElement = KirejiTabGroup.container.lastElementChild
      resolvedDropTargetProperty = "after"
     }
    }
   }
  }
  else if (inRect(pointerEvent, TARGET_ELEMENT.getBoundingClientRect()))
   resolvedTargetDropElement = TARGET_ELEMENT
  else if (inRect(pointerEvent, KirejiTabGroup.container.parentElement.getBoundingClientRect()))
   resolvedTargetDropElement = KirejiTabGroup.container.parentElement

  if (this.dropTargetElement !== resolvedTargetDropElement) {
   this.dropTargetElement?.removeAttribute("data-drop-target")
   this.dropTargetElement = resolvedTargetDropElement
  }

  this.dropTargetElement?.setAttribute("data-drop-target", resolvedDropTargetProperty)

  if (!this.dragPreviewElement) {
   this.dragPreviewElement = this.activeTabIndexOfDraggedItem === -1 ? (() => {
    const offscreen = document.createElement("div")
    offscreen.innerHTML = KirejiTabGroup.renderTabHTML(allSubjects[SUBJECT_INDEX], 0n, -1)
    return offscreen.querySelector("tab-")
   })() : TARGET_ELEMENT.parentElement.cloneNode(true)
   this.dragPreviewElement.setAttribute("data-drag-preview", "")
   this.dragPreviewElement.setAttribute("data-active", "")
   this.dragPreviewElement.removeAttribute("data-drop-target")
   document.body.appendChild(this.dragPreviewElement)
  }
  this.dragPreviewElement.style = `left:${pointerEvent.clientX}px;top:${pointerEvent.clientY - this.dragPreviewElement.clientHeight}px;${this.dropTargetElement === TARGET_ELEMENT ? "visibility:hidden" : ""}`
 },
 drop(pointerEvent) {
  const
   draggedItemWasDroppedOntoItself = inRect(pointerEvent, TARGET_ELEMENT.getBoundingClientRect()),
   draggedItemWasDroppedOntoTabGroup = inRect(pointerEvent, KirejiTabGroup.container.getBoundingClientRect()),
   draggedItemWasDroppedOntoEditor = inRect(pointerEvent, KirejiTabGroup.container.parentElement.getBoundingClientRect()),
   draggedItemIsAlreadyTheActiveTab = this.activeTabIndexOfDraggedItem !== -1,
   draggedItemFileData = draggedItemIsAlreadyTheActiveTab ? KirejiTabGroup.openTabs[this.activeTabIndexOfDraggedItem] : { subject: allSubjects[SUBJECT_INDEX], payload: TAB_PAYLOAD },
   existingTabIndexOfFileData = draggedItemIsAlreadyTheActiveTab ? this.activeTabIndexOfDraggedItem : KirejiTabGroup.openTabs.findIndex(tab => tab.subject === draggedItemFileData.subject),
   tabAlreadyExistsForFileData = existingTabIndexOfFileData !== -1,
   numberOfTabsOpen = KirejiTabGroup.openTabs.length,
   handleItemClick = droppedOntoEditor => {
    if (draggedItemIsAlreadyTheActiveTab)
     return

    if (tabAlreadyExistsForFileData) {
     let recomputeTabGroupRID = false

     if (droppedOntoEditor && existingTabIndexOfFileData === KirejiTabGroup.previewTabIndex) {
      recomputeTabGroupRID = true
      KirejiTabGroup.previewTabIndex = null
     }

     if (existingTabIndexOfFileData !== KirejiTabGroup.activeTabIndex) {
      recomputeTabGroupRID = true
      KirejiTabGroup.activeTabIndex = existingTabIndexOfFileData
     }

     if (recomputeTabGroupRID)
      KirejiTabGroup.recomputeRID()

     return
    }

    if ((KirejiTabGroup.previewTabIndex === null || droppedOntoEditor) && BigInt(KirejiTabGroup.openTabs.length) === KirejiTabGroup.maxTabCount) {
     alert("You have too many tabs open!")
     return
    }

    let indexOfNewlyCreatedTab = numberOfTabsOpen === 0 ? 0 : KirejiTabGroup.activeTabIndex + 1
    let newPreviewTabIndex = null

    if (KirejiTabGroup.previewTabIndex === null) {
     if (!droppedOntoEditor)
      newPreviewTabIndex = indexOfNewlyCreatedTab
    } else {
     if (droppedOntoEditor) {
      newPreviewTabIndex = KirejiTabGroup.previewTabIndex + (indexOfNewlyCreatedTab <= KirejiTabGroup.previewTabIndex)
     } else {
      KirejiTabGroup.openTabs.splice(KirejiTabGroup.previewTabIndex, 1)
      if (KirejiTabGroup.previewTabIndex < indexOfNewlyCreatedTab)
       indexOfNewlyCreatedTab--
      newPreviewTabIndex = indexOfNewlyCreatedTab
     }
    }

    KirejiTabGroup.openTabs.splice(indexOfNewlyCreatedTab, 0, draggedItemFileData)
    KirejiTabGroup.activeTabIndex = indexOfNewlyCreatedTab
    KirejiTabGroup.previewTabIndex = newPreviewTabIndex
    KirejiTabGroup.recomputeRID(true)
   },
   handleTabGroupDragAndDrop = () => {
    const indexWhereItemWasDropped = Array.prototype.indexOf.call(KirejiTabGroup.container.children, this.dropTargetElement) + (this.dropTargetElement.getAttribute("data-drop-target") === "before" ? 0 : 1)

    if (draggedItemIsAlreadyTheActiveTab || tabAlreadyExistsForFileData) {

     const itemWasDroppedToTheRightOfItself = indexWhereItemWasDropped > existingTabIndexOfFileData
     const adjustedIndexWhereItemWasDropped = indexWhereItemWasDropped - +itemWasDroppedToTheRightOfItself

     if (adjustedIndexWhereItemWasDropped === existingTabIndexOfFileData) {
      let recomputeTabGroupRID = false

      if (existingTabIndexOfFileData === KirejiTabGroup.previewTabIndex) {
       recomputeTabGroupRID = true
       KirejiTabGroup.previewTabIndex = null
      }

      if (existingTabIndexOfFileData !== KirejiTabGroup.activeTabIndex) {
       recomputeTabGroupRID = true
       KirejiTabGroup.activeTabIndex = existingTabIndexOfFileData
      }

      if (recomputeTabGroupRID)
       KirejiTabGroup.recomputeRID()

      return
     }

     const previewTab = KirejiTabGroup.previewTab

     // Remove the original tab.
     KirejiTabGroup.openTabs.splice(existingTabIndexOfFileData, 1)

     // Add the new tab.
     KirejiTabGroup.openTabs.splice(adjustedIndexWhereItemWasDropped, 0, draggedItemFileData)

     // Compute the new preview tab index.
     const adjustedPreviewTabIndex = (KirejiTabGroup.previewTabIndex === existingTabIndexOfFileData || KirejiTabGroup.previewTabIndex === null) ? null : KirejiTabGroup.openTabs.indexOf(previewTab)
     KirejiTabGroup.activeTabIndex = adjustedIndexWhereItemWasDropped
     KirejiTabGroup.previewTabIndex = adjustedPreviewTabIndex
     KirejiTabGroup.recomputeRID(true)
    } else {

     if (BigInt(KirejiTabGroup.openTabs.length) === KirejiTabGroup.maxTabCount) {
      alert("You have too many tabs open!")
      return
     }

     const previewTab = KirejiTabGroup.previewTab

     // Add the new tab.
     KirejiTabGroup.openTabs.splice(indexWhereItemWasDropped, 0, draggedItemFileData)

     // Compute the new preview tab index.
     const adjustedPreviewTabIndex = KirejiTabGroup.previewTabIndex === null ? null : KirejiTabGroup.openTabs.indexOf(previewTab)
     KirejiTabGroup.activeTabIndex = indexWhereItemWasDropped
     KirejiTabGroup.previewTabIndex = adjustedPreviewTabIndex
     KirejiTabGroup.recomputeRID(true)
    }
   }

  if (draggedItemWasDroppedOntoItself) handleItemClick()
  else if (draggedItemWasDroppedOntoTabGroup) handleTabGroupDragAndDrop()
  else if (draggedItemWasDroppedOntoEditor) handleItemClick(true)
  else { /* Do nothing. */ }
 },
 reset() {
  this.dropTargetElement?.removeAttribute("data-drop-target")
  this.dragPreviewElement?.remove()

  this.scroller?.unlock()
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
}

Pointer.handle(pointerConfig)