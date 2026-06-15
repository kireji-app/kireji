const
 securityHeader = {
  'request-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  "Critical-CH": "Sec-CH-Prefers-Color-Scheme",
 },
 serviceHeader = {
  ETag: _.ETag,
  'Content-Type': 'application/javascript;charset=UTF-8',
  'Cache-Control': `public, max-age=${_.command === "debug" ? 0 : 31536000}, immutable`,
  ...securityHeader
 },
 sitemapHeader = {
  ETag: _.ETag,
  'Content-Type': 'application/xml',
  'Cache-Control': 'public, max-age=86400, immutable',
  ...securityHeader
 },
 indexHeader = {
  'Content-Type': 'text/html;charset=UTF-8',
  "Document-Policy": "force-load-at-top",
  "Vary": "Sec-CH-Prefers-Color-Scheme",
  // 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; image-src data:; script-src self 'unsafe-inline'",
  // 'Permissions-Policy': 'microphone=(), camera=(), web-share=(self), full-screen=(self)',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  ...securityHeader
 },
 currentExports = {
  proxy(host, pathname, ifNoneMatch, prefersDarkMode, ifModifiedSince) {

   let status, head, body, logMessage
   const defaultRoute = `https://${host}/${_.version}/${_.landingHash}/`

   prepareResponse: {
    if (pathname === `/${_.version}/build.js`) {

     if (ifNoneMatch === _.ETag || ifNoneMatch === "W/" + _.ETag) {
      status = 304
      head = { ETag: _.ETag, ...securityHeader }
      logMessage = "Confirming Artifact"
      break prepareResponse
     }

     _.setRoute(defaultRoute)
     status = 200
     head = { ...serviceHeader }
     body = _["build.js"]
     logMessage = "Serving Artifact"
     break prepareResponse

    }

    if (pathname === `/${_.version}` || pathname === `/${_.version}/`) {
     status = 301
     head = { 'Location': `/${_.version}/${_.landingHash}/`, ...securityHeader }
     logMessage = "Normalizing URL"
     break prepareResponse
    }

    // Color.device.light = !prefersDarkMode
    _.setRoute(`https://${host}${pathname}`)
    const part = lookup(host)
    status = +(part.status ?? 200)
    const customHeaders = part.customHeaders ?? {}
    head = { ...indexHeader, ...customHeaders }
    body = _['part.html']
    logMessage = "Serving Snapshot"
    break prepareResponse
   }

   return { status, head, body, logMessage }
  },
  decode(segment) {
   _.setRID(RID.fromHash(segment))
   return _.model
  },
  encode(model) {
   return RID.toHash(_.modelToRID(model))
  }
 }

module.exports = currentExports

if (environment === "node-module") {
 logScope(0, Server.title + " Ready - Proxy Module")
 return
}

logScope(1, `\nCreating Deployment Artifact`, log => {
 const
  { existsSync, mkdirSync, writeFileSync } = require("fs"),
  { join } = require("path"),
  archiveFolder = join(__dirname, "../../../.versions"),
  artifactPath = `${archiveFolder}/${_.version}.js`

 log(`Saving artifact to ${artifactPath}`)

 if (!existsSync(archiveFolder))
  mkdirSync(archiveFolder)

 writeFileSync(artifactPath, _["build.js"])

 log("Success.")
})

logScope(2, `\nDeployment Artifact Stats`, () => {
 logStringSize(1, _["build.js"])
})

const httpServer = require('http').createServer((request, response) => logServerScope(
 new Date().toLocaleString(),
 request.headers["x-real-ip"] ?? "local-self",
 `https://${request.headers.host}${request.url}`,
 log => {
  let status, head = {}, body, logMessage
  let host = request.headers.host
  const { href, pathname, searchParams } = new URL(`https://${host}${request.url}`)
  const devSuffix = "localhost:" + _.port
  const isLocalRequest = host.endsWith(devSuffix)

  if (isLocalRequest)
   host = host.slice(0, -1 - devSuffix.length)

  function createErrorPage(reason) {
   try {
    ({ status, body, logMessage } = Abstract.error.getErrorResponse(reason, host))
    head = { ...indexHeader }
   } catch (metaError) {
    status = 500
    head = { ...indexHeader }
    body = "<h1>Server Meta Error</h1><p>A server error occurred. Then, a second error was encountered while trying to generate the server error page.</p>"
    logMessage = "Meta Error"
    logError(metaError)
   }
  }

  function prepareResponse() {

   if (pathname === '/-v') {
    status = 200
    head = { 'Content-Type': 'text/plain', ...securityHeader }
    body = _.version
    logMessage = "Serving Version"
    return
   }

   if (["/robots.txt", "/ads.txt", "/sitemap.txt", "/browserconfig.xml"].includes(pathname))
    return createErrorPage(`Config 404:${pathname.slice(1)}`)

   if (pathname.startsWith("/.well-known"))
    return createErrorPage(`Config 404:.well-known folder`)

   if (pathname.endsWith(".map"))
    return createErrorPage(`Config 404:.map file`)

   if (isLocalRequest && !(_.publicHosts.split(" ").includes(host))) {
    /* This is handled by the reverse proxy when not testing locally. */
    if (host && host.startsWith("www."))
     host = host.slice(4)

    if (!(_.publicHosts.split(" ").includes(host)))
     host = _.defaultHost

    status = 302
    head = { 'Location': `http://${host}.${devSuffix}${pathname}`, ...securityHeader }
    logMessage = "Setting Open Part"
    return
   }

   if (pathname === "/sitemap.xml") {
    status = 200
    head = { ...sitemapHeader }
    body = lookup(host)["sitemap.xml"]
    logMessage = "Serving Sitemap"
    return
   }

   if (pathname === "/humans.txt") {
    status = 200
    head = { 'Content-Type': 'text/plain', ...securityHeader }
    body = Server["humans.txt"]
    logMessage = "Serving Credits!"
    return
   }

   if (pathname.startsWith("/apple-touch-icon") || pathname.startsWith("/mstile-") || ["/favicon.ico"].includes(pathname)) {
    status = 200
    head = { 'Content-Type': 'image/png', ...securityHeader }
    body = Buffer.from(lookup(host)["part.png"], 'base64')
    logMessage = "Serving Icon"
    return
   }

   const destinationVersion = pathname.match(/^\/(\d+\.\d+\.\d+)/)?.[1]

   if (!destinationVersion) {
    status = 302
    _.setRoute(`https://${host}/${_.version}/${_.landingHash}/`)
    const translatedPathname = pathname === "/" ? RID.toPath(_.rid) : _.translateCanonicalPathname(host, pathname)
    head = { 'Location': translatedPathname, ...securityHeader }
    logMessage = "Translating Pathname"
    return
   }

   /** @type {IVersionedExports} */
   let destinationExports
   try {
    destinationExports = destinationVersion === _.version ? currentExports : require(`../../../.versions/${destinationVersion}.js`)
   } catch {
    return createErrorPage(`Bad Version: ${destinationVersion}`)
   }

   const sourceVersion = searchParams.get("from")

   if (sourceVersion) {
    if (!/^\d+\.\d+\.\d+$/.test(sourceVersion))
     return createErrorPage("Unsupported `from` parameter: " + sourceVersion)
    /** @type {IVersionedExports} */
    let sourceExports
    try {
     sourceExports = require(`../../../.versions/${sourceVersion}.js`)
    } catch {
     return createErrorPage(`Bad Version: ${sourceVersion}`)
    }

    const sourceHash = pathname.split("/")[2]
    const model = sourceExports.decode(sourceHash)
    const destinationHash = destinationExports.encode(model)
    status = 302
    head = { 'Location': `/${destinationVersion}/${destinationHash}/`, ...securityHeader }
    logMessage = "Updating Version"
    return
   }

   ;
   const payload = destinationExports.proxy(
    host,
    pathname,
    request.headers['if-none-match'],
    request.headers["sec-ch-prefers-color-scheme"] === 'dark',
    request.headers['if-modified-since'],
   )

   status = payload.status
   head = payload.head
   body = payload.body
   logMessage = payload.logMessage
  }

  function writeResponse() {
   log(logMessage, status, { 200: `✓`, get 302() { return `↪ ${head.Location}` }, get 301() { return `↪ ${head.Location}` }, 304: "♻", 400: "✕", 404: "?", 500: "!", 503: `#`, }[status])
   response.writeHead(status, head)
   response.end(body)
  }

  if (_.command === "debug") {
   // Allow uncaught errors to crash the server when testing locally.
   prepareResponse()
   writeResponse()
  } else try {
   prepareResponse()
  } catch (respondError) {
   createErrorPage(respondError)
  } finally {
   writeResponse()
  }
 }
))

httpServer.listen(+_.port, () => logScope(0, `${Server.title} Ready - http://localhost:${_.port}`))