const isTrack = TARGET_ELEMENT === thisScroller.scrollBar
const scrollUp = isTrack ? thisScroller.thumb.getBoundingClientRect().top > POINTER_EVENT.clientY : TARGET_ELEMENT.classList.contains("scroll-up")
const computedStyle = isTrack ? undefined : getComputedStyle(thisScroller.container)
const magnitude = isTrack ? thisScroller.container.clientHeight : (computedStyle.lineHeight === "normal" ? parseFloat(computedStyle.fontSize) * 1.2 : parseFloat(computedStyle.lineHeight))
const scrollVector = magnitude * (scrollUp ? -1 : 1)

let timeoutID = null

Pointer.handle({
 down(delay = 400) {
  thisScroller.container.scrollTop += scrollVector
  timeoutID = setTimeout(delay => this.down(delay), delay, 40)
 },
 reset() {
  clearTimeout(timeoutID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})