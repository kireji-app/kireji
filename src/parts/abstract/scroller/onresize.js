if (thisScroller.container.classList.contains("locked"))
 return

thisScroller.onscroll()
const ratio = thisScroller.container.scrollHeight / thisScroller.container.clientHeight
const precisionFactor = 100_000

thisScroller.scrollBar.style.setProperty("--scroll-thumb-ratio", ratio)

if (Math.round(ratio * precisionFactor) === precisionFactor)
 thisScroller.scrollBar.setAttribute("disabled", "")
else if (thisScroller.scrollBar.hasAttribute("disabled"))
 thisScroller.scrollBar.removeAttribute("disabled")