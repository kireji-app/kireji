if (!scroller.query)
 throw new ReferenceError(`Scrollers must define a css-style "query" property which can select the parent element of the scroller (from ${scroller.host}).`)

scroller.container = Q(scroller.query + ">scroller-")

if (!scroller.container)
 throw new ReferenceError(`Could not find scroller parent element via query "${scroller.query}" (from ${scroller.host}).`)

scroller.scrollBar = Q(scroller.query + ">scroll-bar")

if (!scroller.scrollBar)
 throw new ReferenceError(`Could not find scroller components in the element "${scroller.query}" (from ${scroller.host}). Use scroller.wrap to wrap the HTML contents of the element with the scroller's container and include the custom scroll bar HTML (from ${scroller.host}).`)

scroller.thumb = scroller.scrollBar.querySelector("thumb-")
scroller.content = Q(scroller.query + ">scroller->scroll-content")
scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
scroller.container.addEventListener("scroll", scroller.listener, { passive: true })
scroller.observer = new ResizeObserver(() => scroller.onresize())
scroller.observer.observe(scroller.content)
scroller.observer.observe(scroller.container)