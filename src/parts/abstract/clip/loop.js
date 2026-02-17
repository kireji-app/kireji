if (clip.playing) {
 clip.elapsedTime = _.now - clip.playbackStartTime
 const newElapsedFrames = Math.round(clip.elapsedTime / clip.frameTime)

 if (clip.elapsedFrames !== newElapsedFrames) {
  clip.elapsedFrames = newElapsedFrames
  const nextFrame = clip.playbackStartFrame + BigInt(clip.elapsedFrames)
  if (nextFrame < clip.cardinality)
   clip.setRouteID(nextFrame)
  else clip.handleEndPlayback()
 }
}