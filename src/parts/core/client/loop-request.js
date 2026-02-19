requestAnimationFrame(now => {
 const deltaTime = now - REQUEST_TIME
 // Use 60fps delta if returning to tab or heavy lag.
 client.deltaTime = deltaTime > 100 ? (1000 / 60) : deltaTime
 client.meanFrameTime += (client.deltaTime - client.meanFrameTime) / 20
 client.fps = Math.round(1000 / client.meanFrameTime)
 client.now = now
 _.distributeLoop()
 recurse(now)
})