pointer.handle({
 click() {
  nav.share({
   title: document.title,
   url: location.href
  }).catch(shareError => {
   if (shareError.name !== "AbortError")
    throw shareError
  })
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})