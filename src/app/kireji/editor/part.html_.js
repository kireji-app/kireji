return "<editor->" + (
 `<crumbs->${KirejiEditor["crumbs.html"]}</crumbs-><editor-view>` + KirejiEditor.scroller.wrap(
  KirejiEditor[`${KirejiTabGroup.openTabs.length ? (KirejiTabGroup.activeTab.filename ? "file" : "summary") : "empty"}-view.html`]
 ) + "</editor-view>" +
 KirejiTabGroup["part.html"]
) + "</editor->"