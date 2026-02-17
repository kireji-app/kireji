pointer.handle({
 click() {
  const closing = TARGET_ELEMENT.parentElement.parentElement.hasAttribute("open")

  let toggleMask = 0n
  const triggerPart = folders.superset[FOLDER_INDEX]

  if (["shift", "alt", "context"].includes(_.parts.core.hotKeys.combo)) {
   function gatherRecursively(part) {
    const folderIndex = folders.superset.indexOf(part)

    if (folderIndex === -1)
     return

    toggleMask |= 1n << BigInt(folderIndex)

    if (closing) {
     if (folders.chosenParts.has(part))
      folders.chosenParts.delete(part)
    } else if (!folders.chosenParts.has(part))
     folders.chosenParts.add(part)

    partOutliner.getChildren(part).map(childPart => gatherRecursively(childPart))
   }
   gatherRecursively(triggerPart)
  } else {
   toggleMask = 1n << BigInt(FOLDER_INDEX)
   if (closing) {
    if (folders.chosenParts.has(triggerPart))
     folders.chosenParts.delete(triggerPart)
   } else if (!folders.chosenParts.has(triggerPart))
    folders.chosenParts.add(triggerPart)
  }

  folders.setRouteID(closing ? ~toggleMask & folders.routeID : toggleMask | folders.routeID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})