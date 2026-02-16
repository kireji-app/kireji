const url = new URL(REQUEST_URL)
const devSuffix = "localhost:" + _.port
const routeHost = url.host.endsWith(devSuffix) ? url.host.slice(0, -1 - devSuffix.length) : url.host

if (!(routeHost in _.applications))
 throw `Unsupported Application: ${routeHost}`

const pathname = url.pathname
const newRouteID = decodePathname(pathname)

if (_.application?.key !== routeHost)
 _.application = _.applications[routeHost]

if (_.routeID !== newRouteID)
 _.setRouteID(newRouteID)