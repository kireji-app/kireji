for (const subdomain of thisPart.subdomains) {

 const childPart = thisPart[subdomain]

 if (subdomain.includes("-")) {
  const identifier = camelCase(subdomain)

  if (identifier in thisPart)
   throw error(`Computed camelCase name ${identifier} conflicts with existing component`)

  define(thisPart, { [identifier]: { value: childPart } })
 }

 // Build child parts before building self.
 if (!childPart.domains) {
  define(childPart, {
   "..": { value: thisPart },
   domains: { value: [subdomain, ...thisPart.domains] },
  })
  collectBuild(childPart)
 }

 if (!childPart.isAbstract)
  thisPart.subparts.push(childPart)
}

allParts.push(thisPart)
subjectIndices.set(thisPart.host, allSubjects.length)
allSubjects.push([thisPart.host])

if (!thisPart.isAbstract) {
 instances.push(thisPart)
 const buildActionOwners = []
 let buildActionOwner = thisPart
 while (buildActionOwner) {
  // The ecosystem doesn't have a `build()` action because the its `build.js` is skipped during archiving.
  if (Object.hasOwn(buildActionOwner, "build"))
   buildActionOwners.unshift(buildActionOwner)
  buildActionOwner = buildActionOwner.prototype
 }
 for (const owner of buildActionOwners) {
  log(2, "Build " + owner.host)
  owner.build.call(thisPart)
 }
 const postBuildActionOwners = []
 let postBuildActionOwner = thisPart
 while (postBuildActionOwner) {
  if (Object.hasOwn(postBuildActionOwner, "postBuild"))
   postBuildActionOwners.unshift(postBuildActionOwner)
  postBuildActionOwner = postBuildActionOwner.prototype
 }
 for (const owner of postBuildActionOwners) {
  log(2, "Post Build " + owner.host)
  owner.postBuild.call(thisPart)
 }
}