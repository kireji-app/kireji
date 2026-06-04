if (thisPart.isAbstract)
 throw error(`can't set RID of abstract part`)

if (NEW_RID === undefined)
 throw error(`undefined RID`)

if (typeof NEW_RID !== "bigint")
 throw error(`invalid RID`)

if (NEW_RID >= thisPart.cardinality || NEW_RID < -1n)
 throw error(`RID out of range\n\tRID:${NEW_RID}\n\tRange: [0, ${thisPart.cardinality}]`)

thisPart.previousRID = thisPart.rid
thisPart.rid = NEW_RID
thisPart.wasEnabled = thisPart.enabled
thisPart.enabled = thisPart.rid >= 0
thisPart.disabled = thisPart.rid === -1n
thisPart.justEnabled = thisPart.enabled && !thisPart.wasEnabled
thisPart.justDisabled = !thisPart.enabled && thisPart.wasEnabled
thisPart.deltaRID = thisPart.rid - thisPart.previousRID

if (thisPart.deltaRID === 0n)
 warn(`RID Update Warning: Reassigned RID (${thisPart.rid}) to part.\n ${thisPart[".."] ? `${thisPart[".."].key} {\n  ${thisPart.key} : "${thisPart.host}" // <--- this part \n }` : thisPart.host}`)

thisPart.dirty = true