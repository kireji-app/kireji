scroller.container = Q(scroller.query + ">scroller-")
scroller.scrollBar = Q(scroller.query + ">scroll-bar")
scroller.content = Q(scroller.query + ">scroller->scroll-content")
scroller.thumb = Q(scroller.query + ">scroll-bar>thumb-")

if (!scroller.container || !scroller.scrollBar || !scroller.content || !scroller.thumb)
 throw new ReferenceError(`Could not find necessary scroller elements via query "${scroller.query}". Make sure you have provided the query and used scroller.wrap to wrap the HTML contents of the element with the scroller's container to include the custom scroll bar HTML (from ${scroller.host}).`)

// Listen for changes.
scroller.container.addEventListener("scroll", scroller.listener, { passive: true })
scroller.observer = new ResizeObserver(() => scroller.onresize())
scroller.observer.observe(scroller.content)
scroller.observer.observe(scroller.container)

// Set scroll because (client- and server-rendered) HTML can't provide this.
client.promise.then(() => {
 scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
 scroller.scrollBar.style.setProperty("--fraction", scroller.fraction)
})