thisMix.updateRID(NEW_RID)

if (NEW_RID === -1n) {
 for (const factor of thisMix)
  factor.distributeRID(-1n, SKIP_RUNTIME_STATE_DISTRIBUTION)
} else {
 const factors = [...thisMix]

 for (let i = factors.length - 1; i >= 0; i--) {
  const factor = factors[i]
  const placeValue = thisMix.placeValues.get(factor)
  const rid = NEW_RID / placeValue

  if (factor.rid !== rid)
   factor.distributeRID(rid, SKIP_RUNTIME_STATE_DISTRIBUTION)

  NEW_RID %= placeValue
 }
}