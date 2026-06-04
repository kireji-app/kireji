if (!thisFacet.supported)
 throw error("can't set address bar in this environment")

if (AddressBar.timer)
 clearTimeout(AddressBar.timer)

AddressBar.timer = setTimeout(() => {
 if (_.rid !== AddressBar.RIDCache) {
  AddressBar.RIDCache = _.rid
  const pathname = RID.toPath(_.rid)
  history.replaceState(null, null, pathname)
  AddressBar.throttleStartTime = _.now
  AddressBar.timer = null
 }
}, AddressBar.throttleDuration + AddressBar.throttleStartTime - _.now)

AddressBar.cardinality