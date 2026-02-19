await Promise.all([
 ...PROMISE_ARRAY.filter(promise => promise !== client.promise),
 worker.takeControlAsync()
])

if (!production) {

 // To debug FOUC.
 if (+_.haltHydration) {
  warn('Intentionally blocked hydration.')
  return
 }

 // To simulate slow loading time.
 if (+_.hangHydration > 0) {
  warn(`Intentionally hanging the main thread for ${_.hangHydration} milliseconds.`)
  const start = _.now
  while (_.hangHydration - (_.now - start) > 0)
   Math.sin(Math.random())
 }
}

logScope(0, "Finalizing Hydration", log => {

 log("Defining Client-Only Methods, Globals and Default Listeners")
 Object.assign(globalThis, {
  Q(...args) {
   return document.querySelector(...args)
  },
  inRect(pointerEvent, boundingClientRect) {
   return pointerEvent.clientX >= boundingClientRect.left
    && pointerEvent.clientX <= boundingClientRect.right
    && pointerEvent.clientY >= boundingClientRect.top
    && pointerEvent.clientY <= boundingClientRect.bottom
  },
  setUndoPoint() {
   _.parts.core.addressBar.setUndoPoint()
  },
  pointer: _.parts.core.pointer,
  client: _.parts.core.client
 })

 // Handle navigation. TODO: fix bugs here.
 window.addEventListener("pageshow", pageTransitionEvent => {
  log("Setting Initial State")
  addressBar.useRoute()

  log("Activating Body")
  document.body.classList.remove("unhydrated")

  debug('remove these preview classes', document.querySelectorAll(`[class^="preview-"]`))
 })
 globalThis.addEventListener("popstate", () => {
  log("Setting Initial State")
  addressBar.useRoute()

  log("Activating Body")
  document.body.classList.remove("unhydrated")

  debug('remove these preview classes', document.querySelectorAll(`[class^="preview-"]`))
 })

 // Prevent normal click events to ensure the pointerdown event always takes precedence.
 document.addEventListener("click", pointerEvent => {
  pointerEvent.preventDefault()
  pointerEvent.stopPropagation()
 }, { capture: true })

 log("Setting Initial State")
 // Propagate the initial state (matched to the snapshot exactly).
 addressBar.useRoute()

 log("Activating Interaction")
 // Enable HTML event listeners.
 globalThis._ = _
 // Disable pre-hydration presentation.
 document.body.classList.remove("unhydrated")
 // Switch to post-hydration state propagation.
 client.hydrated = true

 log("Starting Engine Loop")
 // One-frame lag to capture refresh-rate-specific initial timestamp.
 requestAnimationFrame(now => client.requestLoop(now))
})