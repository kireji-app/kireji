pointer.handle({
 click() {
  const windowIndex = windows.instances.findIndex(window => window.application === _.application)
  if (windowIndex !== -1) {
   windows.instances.splice(windowIndex, 1)
   windows.recomputeRouteID()
  }
  _.gotoApplication("desktop.parts")
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})