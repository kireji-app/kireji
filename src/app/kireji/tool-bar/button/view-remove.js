/** @type {IOutliner<IKirejiAppSidebar<IPartAny>>} */
const oldView = KirejiSidebar[thisPart.key]
oldView.scroller.removeView()
Q(`tool-bar>button:nth-child(${thisPart.index + 1})`).removeAttribute("data-active")