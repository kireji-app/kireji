if (!/^[-a-z0-9/]*$/.test(PATHNAME))
 throw error("Bad Canonical Path: " + PATHNAME)

const part = lookup(HOST)
if (typeof part.translateCanonicalPathname === "function")
 return part.translateCanonicalPathname(PATHNAME, HASH)

throw error("Unknown Canonical Path: " + PATHNAME)