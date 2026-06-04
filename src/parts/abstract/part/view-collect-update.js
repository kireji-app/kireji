if (thisPart.dirty) {

 // Update parent view before updating own.
 thisPart[".."]?.collectUpdateView()

 if (thisPart.enabled) {

  if (thisPart.isOpen)
   thisPart.updateView()

  thisPart.notify("update")
 }
}