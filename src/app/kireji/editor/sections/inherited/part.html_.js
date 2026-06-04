const recordSets = []

let prototype = KirejiTabGroup.activePart.prototype
while (prototype) {
 const records = []
 for (const key in prototype.components) {
  if (prototype.components[key].kind === "file") continue
  records.push(KirejiApp.renderComponentHTML(prototype, key))
 }
 recordSets.push(`<part-rows>${records.join("")}</part-rows>`)
 prototype = prototype.prototype
}

return recordSets.join("")