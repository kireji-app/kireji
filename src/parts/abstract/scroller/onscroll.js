if (scroller.skipRouteIDUpdate || !client.hydrated) {
 if (!client.hydrated)
  debug('onscroll from within the hydration phase')
 scroller.skipRouteIDUpdate = false
} else {
 const maxY = scroller.container.scrollHeight
 const newY = scroller.container.scrollTop
 const scrollRouteID = BigInt(Math.trunc(Math.max(Math.min(maxY, newY), 0) / maxY * Number(scroller.cardinality - 1n)))
 if (scroller.routeID !== scrollRouteID) {
  scroller.skipDOMUpdate = true
  scroller.setRouteID(scrollRouteID)
 }
}