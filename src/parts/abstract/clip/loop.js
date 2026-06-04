if (thisClip.playing) {
 thisClip.elapsedTime = _.now - thisClip.playbackStartTime
 const newElapsedFrames = Math.round(thisClip.elapsedTime / thisClip.frameTime)

 if (thisClip.elapsedFrames !== newElapsedFrames) {
  thisClip.elapsedFrames = newElapsedFrames
  const nextFrame = thisClip.playbackStartFrame + BigInt(thisClip.elapsedFrames)
  if (nextFrame < thisClip.cardinality)
   thisClip.setRID(nextFrame)
  else thisClip.handleEndPlayback()
 }
}