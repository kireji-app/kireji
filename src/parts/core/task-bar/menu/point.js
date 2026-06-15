Pointer.handle({
 click() {
  if (TARGET_ELEMENT === Menu.element || TARGET_ELEMENT === Menu.button)
   Menu.arm.handleEndPlayback()
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})