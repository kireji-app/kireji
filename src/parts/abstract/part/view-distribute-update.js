if (thisPart.dirty) {

 // Update own view before updating subpart views.
 if (thisPart.enabled) {

  if (thisPart.isOpen)
   thisPart.updateView()

  for (const subpart of thisPart)
   subpart.distributeUpdateView()

  thisPart.notify("update")
 }
}