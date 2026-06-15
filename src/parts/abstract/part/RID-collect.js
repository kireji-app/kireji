const subparts = [...thisPart]

if (subparts.length) {
 if (subparts.some(subpart => subpart.cardinality !== 1n))
  throw error(`basic parts can't collect their RID from subparts`)
}