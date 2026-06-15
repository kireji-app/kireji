/** @type {(subject: Subject) => string} */
function generateCrumb(subject) {
 const file = subject.kind === "part" ? null : subject
 const part = subject.kind === "part" ? subject : subject.owner
 return `<button ${KirejiEditor.pointAttr("point", subject.subjectIndex)}>${subject.key}</button>`
}

if (KirejiTabGroup.activeTab) {
 const { subject } = KirejiTabGroup.activeTab

 const crumbs = [generateCrumb(subject)]

 let parentPart = subject.kind === "file" ? subject.owner : subject[".."]

 while (parentPart) {
  crumbs.push(generateCrumb(parentPart))
  parentPart = parentPart[".."]
 }

 return crumbs.reverse().join(`<span></span>`)
}

return ""