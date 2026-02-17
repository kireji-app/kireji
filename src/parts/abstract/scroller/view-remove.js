scroller.thumb = null
scroller.content = null
scroller.scrollBar = null
scroller.container.removeEventListener("scroll", scroller.listener, { passive: true })
scroller.container = null
scroller.observer.disconnect()
scroller.observer = null