/** @type {IScroller<IPartOutliner<IKirejiAppSidebar>>} */

if (thisPart.rid === 0n) {
 KirejiSidebar.view.scroller.removeView()
 KirejiSidebar.element.remove()
} else {
 Q("tool-bar").after(KirejiSidebar.element)
 KirejiSidebar.view.scroller.addView()
}