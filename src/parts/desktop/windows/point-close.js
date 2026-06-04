Pointer.handle({
 click() {
  const windowIndex = Windows.instances.findIndex(window => window.part === _.openTask)
  if (windowIndex !== -1) {
   Windows.instances.splice(windowIndex, 1)
   Windows.recomputeRID()
  }
  _.gotoPart("desktop.parts")
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})