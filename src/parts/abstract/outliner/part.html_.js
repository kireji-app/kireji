if (typeof thisOutliner.recursiveItemHTML !== "function")
 throw error(`the "recursiveItemHTML" action is required`)

return (
 `<outliner- id="${thisOutliner.id}">` + thisOutliner.scroller.wrap(
  thisOutliner.recursiveItemHTML(thisOutliner.folderMask.maskedNodeList[0], 0, true)
 ) + `</outliner->`
)