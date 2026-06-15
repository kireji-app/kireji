const nodesToOpen = new Set(thisFolderMask.selectedNodes)

for (const alreadyOpenView of document.querySelectorAll(`#${thisFolderMask[".."].id} details[open]>summary`)) {
 const partIndex = alreadyOpenView.getAttribute("data-index")
 const subjectPart = allParts[partIndex]

 if (!subjectPart)
  throw error(`can't find part with index ${partIndex}`)

 const folderNode = thisFolderMask.nodesBySubject.get(subjectPart)

 if (!folderNode || folderNode.maskIndex === -1)
  throw error(`part ${subjectPart.host} is open but it is not a managed folder`)

 if (nodesToOpen.has(folderNode))
  nodesToOpen.delete(folderNode)
 else {
  alreadyOpenView.parentElement.removeAttribute("open")
  alreadyOpenView.querySelector("svg").innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />
<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`
 }
}

for (const nodeToOpen of nodesToOpen) {
 const partToOpen = nodeToOpen.subject
 const closedView = Q(`#${thisFolderMask[".."].id} details>summary[data-index="${partToOpen.partIndex}"]`)
 closedView.parentElement.setAttribute("open", "")
 closedView.querySelector("svg").innerHTML = `<line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />`
}