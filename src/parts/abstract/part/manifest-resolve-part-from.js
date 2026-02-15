const manifestOwner = part.resolveOwnerOfManifest(PROPERTY_KEY)

if (manifestOwner === null)
 return null

const baseHost = manifestOwner.host
const relativeHost = manifestOwner.manifest[PROPERTY_KEY]
const resolvedHost = resolveRelativeHost(relativeHost, baseHost)

return partsByHost[relativeHost]