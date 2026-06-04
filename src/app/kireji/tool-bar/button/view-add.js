Q(`tool-bar>button:nth-child(${thisPart.index + 1})`).setAttribute("data-active", "")
KirejiSidebar.element.innerHTML = KirejiSidebar["view.html"]
/** @type {IPartOutliner<IKirejiAppSidebar>} */
const newView = KirejiSidebar[thisPart.key]
newView.scroller.addView()