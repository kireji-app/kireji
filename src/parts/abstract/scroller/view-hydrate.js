thisScroller.container = Q(thisScroller.query + ">scroller-")
thisScroller.scrollBar = Q(thisScroller.query + ">scroll-bar")
thisScroller.content = Q(thisScroller.query + ">scroller->scroll-content")
thisScroller.thumb = Q(thisScroller.query + ">scroll-bar>thumb-")

if (!thisScroller.container || !thisScroller.scrollBar || !thisScroller.content || !thisScroller.thumb)
 throw error(`query "${thisScroller.query}" didn't select any scroller components - make sure to use scroller.wrap to wrap the HTML contents of the element`)

// Listen for changes.
thisScroller.container.addEventListener("scroll", thisScroller.listener, { passive: true })
thisScroller.observer = new ResizeObserver(() => thisScroller.onresize())
thisScroller.observer.observe(thisScroller.content)
thisScroller.observer.observe(thisScroller.container)

// Set scroll because (client- and server-rendered) HTML can't provide this.
Client.promise.then(() => {
 thisScroller.container.style.setProperty("--scroller-translate-y", `-${100 * thisScroller.fraction}%`)
 thisScroller.scrollBar.style.setProperty("--fraction", thisScroller.fraction)
 thisScroller.unlock()
})