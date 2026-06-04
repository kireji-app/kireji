if (!KirejiTabGroup.activePart.subdomains.length)
 return ""

const records = []
const activePartSize = serialize(KirejiTabGroup.activePart).length.toLocaleString()

for (const key of KirejiTabGroup.activePart.subdomains) {

 /** @type {IPartAny} */
 const childPart = KirejiTabGroup.activePart[key]
 records.push(`<button ${KirejiEditor.pointAttr("point", allParts.indexOf(childPart))}><img src="${childPart.placeholderImage("part.png")}"/>${childPart.isAbstract ? "<i>" : ""}${childPart.key}${childPart.isAbstract ? "</i>" : ""}<span class=component-size>${serialize(childPart).length.toLocaleString()} B</span></button>`)
}

return `<part-rows>${records.join("")}</part-rows>`