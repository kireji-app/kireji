let manifestOwner = thisPart

warn('!!! running resolveOwnerOfManifest for propert ' + PROPERTY_KEY)

while (manifestOwner && !Object.hasOwn(manifestOwner.manifest, PROPERTY_KEY))
 manifestOwner = manifestOwner.prototype

return manifestOwner