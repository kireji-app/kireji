if (!FACTORS || !FACTORS.length)
 throw error("no mix factors provided")

thisMix.updateRID(FACTORS.reduce(
 (rid, factor) => {
  if (factor.enabled) {
   if (rid === -1n) throw error("can't enable some factors and disable others")
   return rid + factor.deltaRID * thisMix.placeValues.get(factor)
  }
  return -1n
 },
 FACTORS[0].enabled ? (thisMix.disabled ? 0n : thisMix.rid) : -1n
))

if (DEPTH === 1)
 return

thisMix[".."]?.collectRID([thisMix], DEPTH ? DEPTH-- : undefined)