const records = []

for (const key in KirejiTabGroup.activePart.components) {
 if (KirejiTabGroup.activePart.components[key].kind === "file") continue
 records.push(KirejiApp.renderComponentHTML(KirejiTabGroup.activePart, key))
}

return `<part-rows>${records.join("")}</part-rows>`