if (!thisFacet.environments)
 throw error(`missing environments array`)

const environments = thisFacet.environments.split("\n")

define(thisFacet, {
 isAsync: { value: "installAsync" in thisFacet }
})

if (environments.includes(environment)) {
 define(thisFacet, {
  supported: { value: thisFacet.checkSupport() }
 })
 if (!thisFacet.supported)
  define(thisFacet, {
   error: { value: "support check failed" }
  })
} else define(thisFacet, {
 error: { value: `wrong environment (${environment} -> [${environments}]` }
})