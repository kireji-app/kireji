if (thisPart.dirty) {
 thisPart.dirty = false

 for (const subpart of thisPart)
  subpart.distributeClean()
}