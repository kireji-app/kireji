/** @type {IFileDefinition} */
const subjectFile = KirejiTabGroup.activeTab.subject

return `<section id=file-viewer>${HTML.sanitizeAttr(subjectFile.value).split("\n").reduce((html, text, ln) => html + `<span class=code-line><span class=line-number>${ln}</span><code>${text || "\n"}</code></span>`, "")}</section>`