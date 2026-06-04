
logScope(1, thisFacet.title, log => {
 if (thisFacet.supported) {
  if (thisFacet.isAsync) {
   if (environment !== "client")
    throw error("Async Facets are only supported in the client environment.")
   define(thisFacet, {
    promise: {
     value: GATE.promise
      .then(facetArray => thisFacet.installAsync(facetArray))
      .then(() => log(`${thisFacet.title}: Async facet installed.`))
    }
   })
   log(`Enqueued.`)
  } else {
   thisFacet.installSync()
   log(`Installed.`)
  }
 } else log(`Skipped (${thisFacet.error})`)
})