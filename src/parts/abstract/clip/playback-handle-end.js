const options = {
 autoplay() {
  if ("next" in thisClip)
   thisClip.next()
  else
   thisClip[".."].setRID(1n, true)
 },
 autoplayInto() {
  throw error('autoPlayInto not implemented yet')
 },
 loop() {
  thisClip.setRID(1n, true)
 }
}

options[thisClip.endOfPlaybackBehavior]()