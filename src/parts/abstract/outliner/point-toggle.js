Pointer.handle({
 click() {
  const closing = TARGET_ELEMENT.parentElement.parentElement.hasAttribute("open")

  let toggleMask = 0n
  const triggerNode = thisOutliner.folderMask.maskedNodeList[BITMASK_NODE_INDEX]

  if (["shift", "alt", "context"].includes(HotKeys.combo)) {
   /** @type {(node: IBitmaskNode<any>) => void} */
   function gatherRecursively(node) {

    if (node.maskIndex === -1)
     return

    toggleMask |= 1n << BigInt(node.maskIndex)

    if (closing) {
     if (thisOutliner.folderMask.selectedNodes.has(node))
      thisOutliner.folderMask.selectedNodes.delete(node)
    } else if (!thisOutliner.folderMask.selectedNodes.has(node))
     thisOutliner.folderMask.selectedNodes.add(node)

    for (const [, childNode] of node)
     gatherRecursively(childNode)
   }
   gatherRecursively(triggerNode)
  } else {
   toggleMask = 1n << BigInt(BITMASK_NODE_INDEX)
   if (closing) {
    if (thisOutliner.folderMask.selectedNodes.has(triggerNode))
     thisOutliner.folderMask.selectedNodes.delete(triggerNode)
   } else if (!thisOutliner.folderMask.selectedNodes.has(triggerNode))
    thisOutliner.folderMask.selectedNodes.add(triggerNode)
  }

  thisOutliner.folderMask.setRID(closing ? ~toggleMask & thisOutliner.folderMask.rid : toggleMask | thisOutliner.folderMask.rid)
 },
 POINTER_EVENT,
 TARGET_ELEMENT,
 focus: "down"
})