// Don't let this pointer event do anything else.
const noop = event => { event.preventDefault(); event.stopPropagation() }
noop(POINTER_CONFIG.POINTER_EVENT)

// Don't respond to this pointer event if its the wrong type or not the only one.
if (Pointer.id !== null || POINTER_CONFIG.POINTER_EVENT.pointerType === 'mouse' && POINTER_CONFIG.POINTER_EVENT.button !== 0)
 return

const controller = new AbortController()

// Don't allow click or context menu during active pointer session.
document.addEventListener('contextmenu', noop, { capture: true, signal: controller.signal })

const
 // Declare the follow-up event handlers.
 drag = pointerEvent => {

  // Don't let this pointer event do anything else.
  noop(pointerEvent)

  // Don't respond to this pointer event if its not the active one.
  if (pointerEvent.pointerId !== Pointer.id)
   return

  // Perform custom action.
  if (typeof POINTER_CONFIG.drag === "function")
   POINTER_CONFIG.drag(pointerEvent)
 },
 drop = pointerEvent => {

  // Don't let this pointer event do anything else.
  noop(pointerEvent)

  // Don't drop the pointer event if its the wrong type or not the active one.
  if (pointerEvent.pointerId !== Pointer.id || pointerEvent.pointerType === 'mouse' && pointerEvent.button !== 0)
   return

  // Determine if the drop should be handled using a click override.
  const hasDoubleClick = typeof POINTER_CONFIG.doubleClick === "function"
  const wasClick = (typeof POINTER_CONFIG.click === "function" || hasDoubleClick || POINTER_CONFIG.focus === "click") && inRect(pointerEvent, POINTER_CONFIG.TARGET_ELEMENT.getBoundingClientRect())

  if (wasClick) {

   if (hasDoubleClick && Pointer.doubleClick.confirmed) {
    POINTER_CONFIG.doubleClick(pointerEvent)
    endDoubleClick()
   } else {
    // Perform custom single click action.
    if (typeof POINTER_CONFIG.click === "function")
     POINTER_CONFIG.click(pointerEvent)

    // Conditionally focus the element.
    if (POINTER_CONFIG.focus === "click")
     POINTER_CONFIG.TARGET_ELEMENT.focus()
   }
  } else {

   endDoubleClick()
   // Perform custom action.
   if (typeof POINTER_CONFIG.drop === 'function')
    POINTER_CONFIG.drop(pointerEvent)
  }

  // Reset the state to before the initial pointer down.
  reset(pointerEvent)
 },
 reset = () => {

  // Detach follow-up listeners and re-enable context menu.
  controller.abort()

  // Release the pointer capture.
  if (POINTER_CONFIG.TARGET_ELEMENT.hasPointerCapture(Pointer.id))
   POINTER_CONFIG.TARGET_ELEMENT.releasePointerCapture(Pointer.id)

  // Reset the pointer id.
  Pointer.id = null

  // Perform custom action.
  if (typeof POINTER_CONFIG.reset === "function")
   POINTER_CONFIG.reset()

  // Remove CSS feedback.
  POINTER_CONFIG.TARGET_ELEMENT.classList.remove("down")
 },
 endDoubleClick = () => {
  clearTimeout(Pointer.doubleClick.timeout)
  Pointer.doubleClick.target = null
  Pointer.doubleClick.timeout = null
  Pointer.doubleClick.confirmed = null
 }

// Attach to the follow-up event handlers along the whole document.
document.addEventListener("pointermove", drag, { capture: true, signal: controller.signal })
document.addEventListener("pointerup", drop, { capture: true, signal: controller.signal })
document.addEventListener("pointercancel", reset, { capture: true, signal: controller.signal })
Pointer.id = POINTER_CONFIG.POINTER_EVENT.pointerId

// Don't allow anything else to start picking up events.
if (!document.pointerLockElement)
 POINTER_CONFIG.TARGET_ELEMENT.setPointerCapture(Pointer.id)

// Allow CSS styles to target the element while its down.
POINTER_CONFIG.TARGET_ELEMENT.classList.add("down")

// Conditionally focus the element.
if (POINTER_CONFIG.focus === "down")
 POINTER_CONFIG.TARGET_ELEMENT.focus()

// Perform custom action.
if (typeof POINTER_CONFIG.down === "function")
 POINTER_CONFIG.down()

if (Pointer.doubleClick.target) {
 // There is a double click waiter in progress.
 if (Pointer.doubleClick.target !== POINTER_CONFIG.TARGET_ELEMENT) {
  // Cancel it because we just interfered with it.
  endDoubleClick()
 } else {
  Pointer.doubleClick.confirmed = true
 }
} else {
 // There is no double click waiter in progress.
 if (typeof POINTER_CONFIG.doubleClick === "function") {
  // This element should start one.
  Pointer.doubleClick.target = POINTER_CONFIG.TARGET_ELEMENT
  Pointer.doubleClick.timeout = setTimeout(endDoubleClick, 500)
 }
}