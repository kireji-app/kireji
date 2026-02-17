if (part.dirty) {

 // Update own view before updating subpart views.
 if (part.enabled) {

  if (part.isOpen)
   part.updateView()

  for (const subpart of part)
   subpart.distributeUpdateView()

  part.notify("update")
 }
}