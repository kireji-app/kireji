/** @type {IKirejiAppSidebarWidthPointerConfig} */
const pointerConfig = {
 toolBarWidth: Q("tool-bar").clientWidth,
 sidebarWidthRIDCache: KirejiSidebarWidth.rid,
 down() {
  document.body.classList.add("dragging-width-handle")
 },
 drag(pointerEvent) {
  if (pointerEvent.clientX < (KirejiSidebarWidth.min / 2 + this.toolBarWidth)) {
   if (KirejiSidebar.open.rid === 1n) {
    KirejiSidebar.open.setRID(0n)
    if (KirejiSidebarWidth.rid !== this.sidebarWidthRIDCache)
     KirejiSidebarWidth.setRID(this.sidebarWidthRIDCache)
   }
  } else {
   const targetWidth = Math.min(Number(KirejiSidebarWidth.cardinality) - 1, Math.max(0, Math.trunc(pointerEvent.clientX) - KirejiSidebarWidth.min - this.toolBarWidth))
   if (KirejiSidebar.open.rid === 0n)
    KirejiSidebar.open.setRID(1n)
   const targetRID = BigInt(targetWidth)
   if (KirejiSidebarWidth.rid !== targetRID)
    KirejiSidebarWidth.setRID(targetRID)
  }
 },
 reset() {
  document.body.classList.remove("dragging-width-handle")
 },
 POINTER_EVENT,
 TARGET_ELEMENT
}

Pointer.handle(pointerConfig)