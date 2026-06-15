/** @type {IPartAny} */
const activePart = KirejiTabGroup.activeTab.subject

return (
 "<div id=part-intro>" + (
  `<img src="${activePart.placeholderImage("part.png")}"/>` +
  "<div>" + (
   "<h3>" + (
    activePart.title ?? activePart.key
   ) + "</h3>" + (
    activePart.host === "part.abstract.parts" ?
     "<span disabled>This part has no prototype.</span>" :
     `Extends <button ${KirejiEditor.pointAttr("point", activePart.prototype.subjectIndex)}>` + (
      activePart.prototype.title ?? activePart.prototype.key
     ) + '</button>'
   )
  ) + "</div>"
 ) + "</div>" +
 `<p id=description${activePart.description ? "" : " disabled"}>${activePart.description ?? "This part has no description."}</p>`
)