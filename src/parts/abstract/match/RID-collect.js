const oldArm = thisMatch.arm
/** @type Part */
let newArm = null
let disabledArm = null

if (!ARMS || !ARMS.length)
 throw error("no arms provided")

for (const changedArm of ARMS) {

 if (changedArm.enabled) {
  if (newArm && newArm !== changedArm)
   throw error("multiple arms competing to be enabled")

  if (changedArm.deltaRID === 0n)
   throw error("enabled arm didn't change")

  newArm = changedArm
  continue
 }

 if (changedArm.deltaRID !== 0n) {
  if (changedArm !== oldArm)
   throw error("arm assignment out of sync with arm state")
  disabledArm = changedArm
 }
}

if (!newArm)
 throw error("arm to enable could not be found")

if (oldArm && newArm !== oldArm && !disabledArm)
 oldArm.distributeRID(-1n, SKIP_RUNTIME_STATE_DISTRIBUTION)

thisMatch.updateRID(thisMatch.offsets.get(newArm) + newArm.rid)

if (DEPTH === 1)
 return

thisMatch[".."].collectRID([thisMatch], DEPTH ? DEPTH-- : undefined)