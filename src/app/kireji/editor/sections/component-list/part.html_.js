/** @type {IPartAny} */
const activePart = KirejiTabGroup.activeTab.subject

const records = []

for (const key in activePart.components) {
 records.push(KirejiApp.renderComponentHTML(activePart, key))
}

return `<part-rows>${records.join("")}</part-rows>`