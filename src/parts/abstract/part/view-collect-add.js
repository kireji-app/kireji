if (thisPart.dirty && thisPart.justEnabled) {

 // Add parent view before adding own.
 thisPart[".."]?.collectAddView()

 if (thisPart.isOpen)
  thisPart.addView()

 thisPart.notify("add")
}