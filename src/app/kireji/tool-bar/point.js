Pointer.handle({
 click() {
  if (KirejiSidebar.open.rid === 0n) {
   KirejiSidebar.open.setRID(1n)
   if (KirejiToolBar.rid !== BigInt(VIEW_INDEX))
    KirejiToolBar.setRID(BigInt(VIEW_INDEX))
  } else if (KirejiToolBar.rid === BigInt(VIEW_INDEX))
   KirejiSidebar.open.setRID(0n)
  else
   KirejiToolBar.setRID(BigInt(VIEW_INDEX))
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})