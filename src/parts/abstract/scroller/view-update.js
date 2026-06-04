if (thisScroller.skipDOMUpdate) {
 thisScroller.skipDOMUpdate = false
} else {
 thisScroller.skipRIDUpdate = true
 thisScroller.container.scrollTop = thisScroller.fraction * thisScroller.container.scrollHeight
}
thisScroller.container.style.setProperty("--scroller-translate-y", `-${100 * thisScroller.fraction}%`)
thisScroller.scrollBar.style.setProperty("--fraction", thisScroller.fraction)