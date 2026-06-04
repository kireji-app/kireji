return (
 `<part-outliner id="${thisPartOutliner.id}">` + thisPartOutliner.scroller.wrap(
  thisPartOutliner.recursiveItemHTML(thisPartOutliner.dummySubject, 0, true)
 ) + `</part-outliner>`
)