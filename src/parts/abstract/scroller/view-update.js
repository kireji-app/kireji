if (scroller.skipDOMUpdate) {
 scroller.skipDOMUpdate = false
} else {
 scroller.skipRouteIDUpdate = true
 scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
}
scroller.scrollBar.style.setProperty("--fraction", scroller.fraction)