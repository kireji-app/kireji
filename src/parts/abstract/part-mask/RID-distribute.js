thisPartMask.updateRID(NEW_RID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

let chosenParts = 0

thisPartMask.chosenParts.clear()

for (let i = 0; i < thisPartMask.superset.length; i++) {
 const subjectPart = thisPartMask.superset[i]
 const toggleBit = 1n << BigInt(i)
 if ((toggleBit & thisPartMask.rid) > 0n)
  thisPartMask.chosenParts.add(subjectPart)
}