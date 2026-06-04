return (
 "<div id=part-intro>" + (
  `<img src="${KirejiTabGroup.activePart.placeholderImage("part.png")}"/>` +
  "<div>" + (
   "<h3>" + (
    KirejiTabGroup.activePart.title ?? KirejiTabGroup.activePart.key
   ) + "</h3>" + (
    KirejiTabGroup.activePart.host === "part.abstract.parts" ?
     "<span disabled>This part has no prototype.</span>" :
     `Extends <button ${KirejiEditor.pointAttr("point", allParts.indexOf(KirejiTabGroup.activePart.prototype))}>` + (
      KirejiTabGroup.activePart.prototype.title ?? KirejiTabGroup.activePart.prototype.key
     ) + '</button>'
   )
  ) + "</div>"
 ) + "</div>" +
 `<p id=description${KirejiTabGroup.activePart.description ? "" : " disabled"}>${KirejiTabGroup.activePart.description ?? "This part has no description."}</p>`
)