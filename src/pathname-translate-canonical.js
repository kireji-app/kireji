if (!/^[-a-z0-9/]*$/.test(PATHNAME))
 throw error("Bad Canonical Path: " + PATHNAME)

const resolvingPart = lookup(HOST)
if (typeof resolvingPart.translateCanonicalPathname === "function")
 return resolvingPart.translateCanonicalPathname(PATHNAME, HASH)

throw error("Unknown Canonical Path: " + PATHNAME)