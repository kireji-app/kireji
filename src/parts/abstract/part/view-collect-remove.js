if (thisPart.dirty && thisPart.justDisabled) {

 // Remove own view before removing parent.
 if (thisPart.isOpen)
  thisPart.removeView()

 thisPart.notify("remove")

 thisPart[".."]?.collectRemoveView()
}