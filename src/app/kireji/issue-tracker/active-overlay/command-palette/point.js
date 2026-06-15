Pointer.handle({
 click() {
  if (KirejiIssuesActiveOverlay.arm !== KirejiIssueCommandPalette)
   KirejiIssuesActiveOverlay.setModel(KirejiIssueCommandPalette.key)

  if (!KirejiIssueCommandPalette.hasDropdown)
   KirejiIssueCommandPalette.open()
 },
 TARGET_ELEMENT,
 POINTER_EVENT
})