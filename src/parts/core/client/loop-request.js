requestAnimationFrame(now => {
 const deltaTime = now - REQUEST_TIME
 // Use 60fps delta if returning to tab or heavy lag.
 Client.deltaTime = deltaTime > 100 ? (1000 / 60) : deltaTime
 Client.meanFrameTime += (Client.deltaTime - Client.meanFrameTime) / 20
 Client.fps = Math.round(1000 / Client.meanFrameTime)
 Client.now = now
 _.distributeLoop()
 recurse(now)
})