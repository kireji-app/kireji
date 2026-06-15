Q(`tool-bar>button:nth-child(${thisPart.index + 1})`).setAttribute("data-active", "")
KirejiSidebar.element.innerHTML = KirejiSidebar["view.html"]
/** @type {IOutliner<IKirejiAppSidebar<IPartAny>>} */
const newView = KirejiSidebar[thisPart.key]
newView.scroller.addView()