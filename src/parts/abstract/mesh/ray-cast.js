// Define a safe result: the current position before casting.
const safeIterationResult = {
 hit: false,
 triIndex: mesh.triIndex,
 point: { ...mesh.position },
 forceVector: FORCE_VECTOR
}

// If there's no motion, nothing will happen; return the safe result.
if (Vector.magnitude(FORCE_VECTOR) === 0)
 return safeIterationResult

// Otherwise, initialize timing data as though the vector doesn't intersect any grid lines.
const timeOfNextIntersection = { x: Infinity, y: Infinity }
const timeBetweenIntersections = { ...timeOfNextIntersection }

// If the force vector isn't paralell to the x axis...
if (FORCE_VECTOR.x !== 0) {

 // Determine the x coordinate of the first grid line it may intersect.
 const nextGridX = Math.floor(mesh.position.x) + (FORCE_VECTOR.x > 0)

 // Compute the exact moment that intersection will happen.
 timeOfNextIntersection.x = (nextGridX - mesh.position.x) / FORCE_VECTOR.x

 // Compute the constant time between each grid line intersection.
 timeBetweenIntersections.x = 1 / Math.abs(FORCE_VECTOR.x)
}

// Perform the same steps for the y-axis.
if (FORCE_VECTOR.y !== 0) {
 const nextGridY = Math.floor(mesh.position.y) + (FORCE_VECTOR.y > 0)
 timeOfNextIntersection.y = (nextGridY - mesh.position.y) / FORCE_VECTOR.y
 timeBetweenIntersections.y = 1 / Math.abs(FORCE_VECTOR.y)
}

// Set the clock to zero.
let time = 0

// While there is still time to spare...
while (time <= DELTA_TIME) {

 // Pick the dimension whose grid intersection will happen next.
 const dimension = timeOfNextIntersection.x < timeOfNextIntersection.y ? "x" : "y"

 // Note how much time must elapse to reach that intersection.
 let timeElapsedDuringThisIteration = timeOfNextIntersection[dimension] - time

 // Set the clock to the moment of that intersection.
 time += timeElapsedDuringThisIteration

 // Note if this is a case where the grid intersection is reached after the time limit.
 const ranOutOfTime = time >= DELTA_TIME

 // In that case...
 if (ranOutOfTime) {

  // Measure how far we are past the time limit.
  const overshootTime = time - DELTA_TIME

  // Adjust how much time we say elapsed.
  timeElapsedDuringThisIteration -= overshootTime

  // Set the block back to the last possible moment.
  time = DELTA_TIME
 }

 // Construct the next point along the ray, given the elapsed time.
 const point = Vector.add(safeIterationResult.point, Vector.multiply(FORCE_VECTOR, timeElapsedDuringThisIteration))

 // Check if the point is outside the mesh boundary.
 const triIndex = mesh.triThatContainsPoint(point)

 // If it is...
 if (triIndex === -1) {

  // Discard the unsafe point and return the safe result data.
  safeIterationResult.hit = true
  return safeIterationResult
 }

 // Otherwise, update the safe result.
 safeIterationResult.point = point
 safeIterationResult.triIndex = triIndex

 // If we ran out of time...
 if (ranOutOfTime) {

  // We're done. Return the exact end point of the ray cast.
  return safeIterationResult
 }

 // Otherwise, Prepare for the next grid line time of this dimension.
 timeOfNextIntersection[dimension] += timeBetweenIntersections[dimension]
}