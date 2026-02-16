await Promise.all([
 ...PROMISE_ARRAY.filter(promise => promise !== client.promise),
 worker.takeControlAsync()
])

logScope(0, "Finalizing Hydration", log => {
 if (+_.haltHydration && !production)
  warn('Intentionally blocked hydration.')
 else {

  // To preview FOUC
  if (_.hangHydration > 0 && !production)
   logScope(0, `Intentionally hanging the main thread for ${_.hangHydration} milliseconds.`, log => {
    const start = _.now
    let iteration = -1, elapsedMilliseconds, remainingMilliseconds
    do {
     elapsedMilliseconds = Math.trunc(_.now - start)
     const newRemainingMilliseconds = _.hangHydration - elapsedMilliseconds
     Math.sin(iteration++)
     if (Math.trunc(newRemainingMilliseconds / 100) !== Math.trunc(remainingMilliseconds / 100))
      log("t: -" + newRemainingMilliseconds)
     remainingMilliseconds = newRemainingMilliseconds
    } while (remainingMilliseconds > 0)
    log(`Main thread hang finished at iteration ${iteration}.`)
   })

  log("Defining Client-Only Methods, Globals and Default Listeners")
  if (environment === "client") {
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

   // Clean up preview operations upon going back.
   window.addEventListener("pageshow", pageTransitionEvent => {
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

   // Listen for history popstate (but why?).
   globalThis.addEventListener("popstate", () => {
    log("Setting Initial State")
    addressBar.useRoute()

    log("Activating Body")
    document.body.classList.remove("unhydrated")

    debug('remove these preview classes', document.querySelectorAll(`[class^="preview-"]`))
   })
  }

  log("Setting Initial State")
  addressBar.useRoute()

  log("Activating Body")
  document.body.classList.remove("unhydrated")

  // Make ecosystem available to HTML event handlers.
  globalThis._ = _

  log("Starting Engine Loop")
  _.define({
   frameRequest: { value: requestAnimationFrame(() => _.distributeLoop()), writable: true },
  })

  log("Client hydration complete.")
  client.hydrated = true
 }
})