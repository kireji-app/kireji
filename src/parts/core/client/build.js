facet.define({
 hydrated: { value: false, writable: true }
})

// TODO: is this the approach for this?
if (environment === "client")
 Object.assign(globalThis, {
  Q(...args) {
   return document.querySelector(...args)
  },
  inRect(pointerEvent, boundingClientRect) {
   return pointerEvent.clientX >= boundingClientRect.left
    && pointerEvent.clientX <= boundingClientRect.right
    && pointerEvent.clientY >= boundingClientRect.top
    && pointerEvent.clientY <= boundingClientRect.bottom
  }
 })