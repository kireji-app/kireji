const manifestOwner = thisPart.resolveOwnerOfManifest(PROPERTY_KEY)

if (!manifestOwner)
 return null

const baseHost = manifestOwner.host
const relativeHost = manifestOwner.manifest[PROPERTY_KEY]
const resolvedHost = resolveRelativeHost(relativeHost, baseHost)

return lookup(relativeHost)