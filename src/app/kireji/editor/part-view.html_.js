/** @type {IPartAny} */
const activePart = KirejiTabGroup.activeTab.subject

return KirejiEditorSections.map(section =>
 `<details class=info-section id=info-${section.key}${section.model ? " open" : ""}>` + (
  `<summary ${section.pointAttr()}>` + (
   section.title
  ) + `</summary>` +
  `<section class=info-body ${section.key.startsWith("state") && (!activePart.isInstance || section.key === "state" && activePart.disabled) ? " disabled" : ""}>` + (
   section["part.html"]
  ) + `</section>`
 ) + `</details>`
).join("")