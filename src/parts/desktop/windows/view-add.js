base()

if (_.application !== desktop) {
 _.parts.core.client.promise.then(() => {
  const windowIndex = windows.instances.findIndex(window => window.application === _.application)
  if (windowIndex === -1) {
   windows.instances.push({
    application: _.application,
    left: 0,
    top: 0,
    width: 1999,
    height: 1999
   })
   windows.recomputeRouteID()
  }
 })
}