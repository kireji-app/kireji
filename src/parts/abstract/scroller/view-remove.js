thisScroller.thumb = null
thisScroller.content = null
thisScroller.scrollBar = null
thisScroller.container.removeEventListener("scroll", thisScroller.listener, { passive: true })
thisScroller.container = null
thisScroller.observer.disconnect()
thisScroller.observer = null