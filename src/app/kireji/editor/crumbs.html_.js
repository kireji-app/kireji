function generateCrumb(part, filename) {
 return `<button ${KirejiEditor.pointAttr("point", allParts.indexOf(part), ...(filename ? [part.filenames.indexOf(filename)] : []))}>${filename ?? (part === _ ? _.name : part.key)}</button>`
}

if (KirejiTabGroup.activePart) {
 const crumbs = []

 let part = KirejiTabGroup.activePart

 if (KirejiTabGroup.activeTab.filename)
  crumbs.push(generateCrumb(KirejiTabGroup.activePart, KirejiTabGroup.activeTab.filename))

 while (part) {
  crumbs.push(generateCrumb(part))
  part = part[".."]
 }

 return crumbs.reverse().join(`<span></span>`)
}

return ""