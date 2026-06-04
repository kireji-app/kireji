Pointer.handle({
 click() {
  const closing = TARGET_ELEMENT.parentElement.parentElement.hasAttribute("open")

  let toggleMask = 0n
  const triggerPart = thisPartOutliner.folders.superset[FOLDER_INDEX]

  if (["shift", "alt", "context"].includes(HotKeys.combo)) {
   function gatherRecursively(part) {
    const folderIndex = thisPartOutliner.folders.superset.indexOf(part)

    if (folderIndex === -1)
     return

    toggleMask |= 1n << BigInt(folderIndex)

    if (closing) {
     if (thisPartOutliner.folders.chosenParts.has(part))
      thisPartOutliner.folders.chosenParts.delete(part)
    } else if (!thisPartOutliner.folders.chosenParts.has(part))
     thisPartOutliner.folders.chosenParts.add(part)

    thisPartOutliner.getChildren(part).map(childPart => gatherRecursively(childPart))
   }
   gatherRecursively(triggerPart)
  } else {
   toggleMask = 1n << BigInt(FOLDER_INDEX)
   if (closing) {
    if (thisPartOutliner.folders.chosenParts.has(triggerPart))
     thisPartOutliner.folders.chosenParts.delete(triggerPart)
   } else if (!thisPartOutliner.folders.chosenParts.has(triggerPart))
    thisPartOutliner.folders.chosenParts.add(triggerPart)
  }

  thisPartOutliner.folders.setRID(closing ? ~toggleMask & thisPartOutliner.folders.rid : toggleMask | thisPartOutliner.folders.rid)
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})