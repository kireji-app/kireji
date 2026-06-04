Pointer.handle({
 click() {
  navigator.share({
   title: document.title,
   url: location.href
  }).catch(shareError => {
   if (shareError.name !== "AbortError")
    throw error("native share failed", shareError)
  })
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})