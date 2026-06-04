return thisPartOutliner.getChildren(SUBJECT).map((childPart, i, childArray) => {
 const hasSubparts = thisPartOutliner.getChildren(childPart).length !== 0
 const folderIndex = hasSubparts ? thisPartOutliner.folders.superset.indexOf(childPart) : -1
 const isOpen = hasSubparts && !!((thisPartOutliner.folders.rid >> BigInt(folderIndex)) & 1n)
 const partIndex = allParts.indexOf(childPart)
 const symbol = `<img src="${childPart.placeholderImage("part.png")}"/>`
 const handle = hasSubparts ? `<svg ${thisPartOutliner.pointAttr("togglePoint", folderIndex)} xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="explore-toggle"><line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />${isOpen ? "" : `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`}</svg>` : ""
 const label = `<span class="label${childPart.isAbstract ? " abstract" : ""}">${thisPartOutliner.getLabel(childPart)}</span>`
 const summary = `<summary ${thisPartOutliner.pointAttr("point", partIndex)} data-index="${partIndex}"${thisPartOutliner.isActive(childPart) ? " data-active" : ""}${IS_LAST_OF_TYPE && !hasSubparts ? ' id="lastOutlinerItem"' : ""}><outliner-spacer style="--depth:${DEPTH + +!hasSubparts}"></outliner-spacer>${handle}${symbol}${label}</summary>`
 return `<details${hasSubparts ? "" : ` class=empty`} ${isOpen ? "open" : ""}>${summary}${recurse(childPart, DEPTH + 1, IS_LAST_OF_TYPE && i === childArray.length - 1)}</details>`
}).join("")