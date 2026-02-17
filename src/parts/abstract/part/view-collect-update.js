if (part.dirty) {

 // Update parent view before updating own.
 part[".."]?.collectUpdateView()

 if (part.enabled) {

  if (part.isOpen)
   part.updateView()

  part.notify("update")
 }
}