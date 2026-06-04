let resultRID = 0n

for (const host of MODEL) {
 const chosenPart = lookup(host)

 // This check is necessary for ingesting the model of an earlier version of the ecosystem.
 if (!chosenPart)
  continue // The part was moved/renamed or doesn't exist anymore, so it can't be linked.

 const partIndex = thisPartMask.superset.indexOf(chosenPart)
 const toggleBit = 1n << BigInt(partIndex)
 resultRID |= toggleBit
}

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID