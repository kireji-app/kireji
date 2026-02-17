if (client.hydrated) {
 // Pretty sure this block won't do anything until after hydration.
 if (scroller.skipDOMUpdate) {
  scroller.skipDOMUpdate = false
 } else {
  // Does this work if we don't wait for the client promise here ...
  // const updateDOM = () => {
  scroller.skipRouteIDUpdate = true
  scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
  // }
  // if (client.hydrated) updateDOM()
  // else client.promise.then(updateDOM)
 }

 // Always required, because this particular thing isnt able to be rendered by the server.
 // But consider. This could also be done on add as well as populate.
 // const updateDOM = () => {
 scroller.scrollBar.style.setProperty("--fraction", scroller.fraction)
 // }

 // if (client.hydrated) updateDOM()
 // else client.promise.then(updateDOM)
}