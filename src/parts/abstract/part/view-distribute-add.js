if (thisPart.dirty) {

 // Add own view before adding subpart views.
 if (thisPart.justEnabled) {

  if (thisPart.isOpen)
   thisPart.addView()

  thisPart.notify("add")
 }

 for (const subpart of thisPart)
  subpart.distributeAddView()
}