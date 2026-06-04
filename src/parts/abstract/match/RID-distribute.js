thisMatch.updateRID(NEW_RID)

const arms = [...thisMatch]

if (NEW_RID === -1n) {
 if (thisMatch.arm !== null)
  thisMatch.arm.distributeRID(-1n, SKIP_RUNTIME_STATE_DISTRIBUTION)
 thisMatch.arm = null
} else for (let index = 0; index < arms.length; index++) {
 const nextIndex = index + 1

 if (nextIndex === arms.length || NEW_RID < thisMatch.offsets.get(arms[nextIndex])) {
  const oldArm = thisMatch.arm
  const newArm = arms[index]
  const armRID = NEW_RID - thisMatch.offsets.get(newArm)

  if (oldArm && oldArm !== newArm)
   oldArm.distributeRID(-1n, SKIP_RUNTIME_STATE_DISTRIBUTION)

  newArm.distributeRID(armRID, SKIP_RUNTIME_STATE_DISTRIBUTION)
  thisMatch.arm = newArm
  break
 }
}