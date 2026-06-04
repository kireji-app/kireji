base()

if (_.openTask !== Desktop) {
 Client.promise.then(() => {
  const windowIndex = Windows.instances.findIndex(window => window.part === _.openTask)
  if (windowIndex === -1) {
   Windows.instances.push({
    part: _.openTask,
    left: 0,
    top: 0,
    width: 1999,
    height: 1999
   })
   Windows.recomputeRID()
  }
 })
}