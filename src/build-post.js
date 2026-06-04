_.transformMetadata()
Base.countAndSortInheritors()
Core.installFacets()
logEntropy(2, ...instances)

define(_, {
 landingRID: { value: _.modelToRID(_.landingModel) },
 landingHash: { resolve() { return RID.toHash(this.landingRID) } }
})

logScope(1, "\nValidating Build", () => {
 if (environment === "node-main") {
  logScope(1, "Routing Test", log => {
   const testURL = `https://${_.defaultHost}/${_.version}/${_.landingHash}/`
   log("Test URL: " + testURL)
   logScope(1, "Setting route.", () => _.setRoute(testURL))

   logScope(3, "Landing RID", log => log(_.landingRID))
   logScope(3, "Resulting RID", log => log(_.rid))

   logScope(3, "Landing Hash", log => log(_.landingHash))
   logScope(3, "Resulting Hash", log => log(RID.toHash(_.rid)))

   if (_.landingRID !== _.rid)
    throw error("SetRoute Mismatch")

   else log("RESULT: Exact Match")
  })
  logScope(1, "\nIndex Fetching Test", log => {
   const result = _["part.html"]

   if (!result || typeof result !== "string")
    throw error("Index fetching failed.")

   log("RESULT: Index Fetched")
  })
  logScope(1, "\nSerialization Test", log => {

   // Acquire the serialized archive captured before the build started.
   const { preBuildArchive } = _

   // Delete that archive (a large string) to allow garbage collection to remove it after build.
   delete _.preBuildArchive

   // Strip down the ecosystem to its enumerable, serializable properties.
   const postBuildEnumerable = JSON.parse(serialize(_))

   // Reset any data that was changed on purpose during build.
   postBuildEnumerable.compressedMetadata = ""

   // Reserialize it.
   const postBuildArchive = serialize(postBuildEnumerable)

   // Compare and contrast the two archives.
   if (postBuildArchive !== preBuildArchive) {
    warn(`The post-hydration archive was ${postBuildArchive.length - preBuildArchive.length} bytes longer than the pre-hydration archive.`)
    const lines1 = preBuildArchive.split('\n')
    const lines2 = postBuildArchive.split('\n')
    const maxLength = Math.max(lines1.length, lines2.length)
    for (let i = 0; i < maxLength; i++) {
     const line1 = lines1[i] || ''
     const line2 = lines2[i] || ''
     if (line1 !== line2) {
      if (line2.length - line1.length === 1 && line2.at(-1) === ",")
       continue
      warn(`Found line difference between pre- and post-hydration archives.`, { lineNumber: i + 1, line1: line1, line2: line2 })
      break
     }
    }
   } else log(`RESULT: Exact match.`)
  })
 }
})