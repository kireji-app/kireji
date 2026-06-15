const isOpen = thisOutliner.folderMask.selectedNodes.has(BITMASK_NODE)

/** @type {IPartAny} */
const folderPart = BITMASK_NODE.subject
const subpartHTML = []

if (isOpen || environment === "client") {
 BITMASK_NODE.entries().forEach((entry, i) => {

  /** @type {IPartAny} */
  const childSubject = entry[0]
  const childNode = entry[1]

  if (childNode.isLeaf) {
   subpartHTML.push(`<details class=empty><summary ${thisOutliner.pointAttr("point", childNode.index)} data-index="${childSubject.partIndex}"${thisOutliner.isActive?.(childNode) ? " data-active" : ""}${IS_LAST_OF_TYPE ? ' id="lastOutlinerItem"' : ""}><outliner-spacer style="--depth:${DEPTH + 2}"></outliner-spacer><img src="${childSubject.placeholderImage("part.png")}"/><span class="label${childSubject.isInstance ? "" : " abstract"}">${childSubject.key}</span></summary></details>`)
  } else {
   subpartHTML.push(recurse(childNode, DEPTH + 1, IS_LAST_OF_TYPE && i === BITMASK_NODE.size - 1))
  }
 })
}

return `<details ${isOpen ? "open" : ""}><summary ${thisOutliner.pointAttr("point", BITMASK_NODE.index)} data-index="${folderPart.partIndex}"${thisOutliner.isActive?.(BITMASK_NODE) ? " data-active" : ""}><outliner-spacer style="--depth:${DEPTH}"></outliner-spacer><svg ${thisOutliner.pointAttr("togglePoint", BITMASK_NODE.maskIndex)} xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="explore-toggle"><line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />${isOpen ? "" : `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`}</svg><img src="${folderPart.placeholderImage("part.png")}"/><span class="label${folderPart.isInstance ? "" : " abstract"}">${folderPart.key}</span></summary>${subpartHTML.join("")}</details>`