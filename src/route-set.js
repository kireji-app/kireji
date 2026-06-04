const url = new URL(REQUEST_URL)
const devSuffix = "localhost:" + _.port
const routeHost = url.host.endsWith(devSuffix) ? url.host.slice(0, -1 - devSuffix.length) : url.host
const part = lookup(routeHost)

if (!part)
 throw error(`Unsupported Host: ${routeHost}`)

const pathname = url.pathname
const decodedRID = RID.fromPath(pathname)

if (_.openTask?.key !== routeHost)
 _.openTask = part

if (_.rid !== decodedRID)
 _.setRID(decodedRID)