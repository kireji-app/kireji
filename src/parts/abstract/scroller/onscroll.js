if (thisScroller.container.classList.contains("locked"))
 return

if (thisScroller.skipRIDUpdate || !Client.hydrated) {
 thisScroller.skipRIDUpdate = false
} else {
 const maxY = thisScroller.container.scrollHeight
 const newY = thisScroller.container.scrollTop
 const scrollRID = BigInt(Math.trunc(Math.max(Math.min(maxY, newY), 0) / maxY * Number(thisScroller.cardinality - 1n)))
 if (thisScroller.rid !== scrollRID) {
  thisScroller.skipDOMUpdate = true
  thisScroller.setRID(scrollRID)
 }
}