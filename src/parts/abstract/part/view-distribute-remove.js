if (thisPart.dirty) {

 // Remove subpart views before removing own.
 for (const subpart of thisPart)
  subpart.distributeRemoveView()

 if (!thisPart.enabled) {

  if (thisPart.isOpen)
   thisPart.removeView()

  thisPart.notify("remove")
 }
}