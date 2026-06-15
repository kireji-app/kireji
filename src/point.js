Pointer.handle({
 click() {

  if (TARGET_ELEMENT.classList.contains("external")) {
   window.open(TARGET_ELEMENT.href, '_blank')
   return
  }

  const { host, pathname, hash } = new URL(TARGET_ELEMENT.href, `https://${_.openTask.host}${RID.toPath(_.rid)}`)

  const destinationVersion = pathname.match(/^\/(\d+\.\d+\.\d+)/)?.[1]

  if (destinationVersion)
   throw error(`unexpected versioned link\n\t${TARGET_ELEMENT.href}`)

  if (host !== _.openTask.host) {
   if (lookup(host)) {
    if (pathname === "/" && !hash) {
     _.gotoPart(host)
    } else warn(error(`cross-host navigation and canonical pathname are not yet handled because of ambiguity between changing the open part and linking to a canonical home state of the given part`))
   } else warn(error(`can't find host "${host}" in ecosystem`))
   return
  }

  const translatedPathname = _.translateCanonicalPathname(_.openTask.host, pathname, hash)
  const translatedRID = RID.fromPath(translatedPathname)

  if (_.rid !== translatedRID) {
   setUndoPoint()
   _.setRID(translatedRID)
  }
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})