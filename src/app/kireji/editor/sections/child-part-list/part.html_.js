/** @type {IPartAny} */
const activePart = KirejiTabGroup.activeTab.subject

if (!activePart.subdomains.length)
 return ""

const records = []

for (const key of activePart.subdomains) {

 /** @type {IPartAny} */
 const childPart = activePart[key]
 records.push(`<button ${KirejiEditor.pointAttr("point", childPart.subjectIndex)}><img src="${childPart.placeholderImage("part.png")}"/>${childPart.isInstance ? "" : "<i>"}${childPart.key}${childPart.isInstance ? "" : "</i>"}<span class=component-size>${childPart.isClone ? "0 B (clone)" : serialize(childPart)?.length.toLocaleString() + " B"}</span></button>`)
}

return `<part-rows>${records.join("")}</part-rows>`