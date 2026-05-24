match.updateRouteID(ROUTE_ID)

const arms = [...match]

if (ROUTE_ID === -1n) {
 if (match.arm !== null)
  match.arm.distributeRouteID(-1n, SKIP_RUNTIME_STATE_DISTRIBUTION)
 match.arm = null
} else for (let index = 0; index < arms.length; index++) {
 const nextIndex = index + 1

 if (nextIndex === arms.length || ROUTE_ID < match.offsets.get(arms[nextIndex])) {
  const oldArm = match.arm
  const newArm = arms[index]
  const armRouteID = ROUTE_ID - match.offsets.get(newArm)

  if (oldArm && oldArm !== newArm)
   oldArm.distributeRouteID(-1n, SKIP_RUNTIME_STATE_DISTRIBUTION)

  newArm.distributeRouteID(armRouteID, SKIP_RUNTIME_STATE_DISTRIBUTION)
  match.arm = newArm
  break
 }
}