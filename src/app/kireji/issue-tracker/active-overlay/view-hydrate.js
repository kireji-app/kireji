Client.promise.then(() => {

 document.addEventListener('pointerdown', pointerEvent => {

  if (KirejiIssuesActiveOverlay.arm === KirejiIssueModal)
   return

  if (KirejiIssuesActiveOverlay.arm === KirejiIssueCommandPalette) {

   if (!KirejiIssueCommandPalette.hasDropdown)
    return

   if (!(pointerEvent.target.id === "command-palette" || pointerEvent.target.closest("#command-palette"))) {
    KirejiIssueCommandPalette.close()
    pointerEvent.stopPropagation()
    pointerEvent.preventDefault()
   }

  } else {

   if (!inRect(pointerEvent, Q("#issue-filter-dropdown").getBoundingClientRect())) {

    if (inRect(pointerEvent, Q("#issue-tracker_kireji_app .issue-table").getBoundingClientRect()) || inRect(pointerEvent, Q(`#issue-tracker_kireji_app .header>.issue-filter-${KirejiIssuesActiveOverlay.arm.key}`).getBoundingClientRect())) {
     pointerEvent.stopPropagation()
     pointerEvent.preventDefault()
    }

    KirejiIssuesActiveOverlay.setModel("command-palette")
   }
  }

 }, { capture: true })
})