for (const subdomain of thisPart.subdomains) {

 /** @type {IPartAny} */
 const childPart = thisPart[subdomain]

 // Provide the camelCase name.
 if (subdomain.includes("-")) {
  const identifier = camelCase(subdomain)

  // We allow the camel case name to replace inherited properties but not own properties.
  if (identifier in thisPart && Object.hasOwn(thisPart, identifier))
   throw error(`Computed camelCase name ${identifier} conflicts with existing component (on part ${thisPart.host})`)

  define(thisPart, {
   [identifier]: {
    value: childPart
   }
  })
 }

 // Build child parts before building self.
 if (!childPart.domains) {
  define(childPart, {
   "..": { value: thisPart },
   domains: { value: [subdomain, ...thisPart.domains] },
  })
  collectDefine(childPart)
 }

 if (childPart.isInstance)
  thisPart.subparts.push(childPart)
}