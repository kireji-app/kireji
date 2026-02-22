// Define a safe result: the current position before casting.
const safeIterationResult = {
 hit: false,
 triIndex: mesh.triIndex,
 point: { ...mesh.position },
 forceVector: FORCE_VECTOR
}

// Obtain the speed of the force vector, which will be used later if we need to slide along the boundary.
const speed = Vector.magnitude(FORCE_VECTOR)

// If there's no motion, nothing will happen; return the safe result.
if (speed === 0)
 return safeIterationResult

// Otherwise, initialize timing data as though the vector doesn't intersect any grid lines.
const timeOfNextIntersection = { x: Infinity, y: Infinity }
const timeBetweenIntersections = { ...timeOfNextIntersection }

// Set the clock to zero.
let time = 0

function initalizeRayIntersectionSchedule(alsoComputeIntersectionInterval) {

 // If the force vector isn't parallel to the x axis...
 if (FORCE_VECTOR.x !== 0) {

  // Determine the x coordinate of the first grid line the ray may intersect.
  const nextGridX = Math.floor(safeIterationResult.point.x) + (FORCE_VECTOR.x > 0)

  // Compute the exact moment that intersection will happen.
  timeOfNextIntersection.x = time + (nextGridX - safeIterationResult.point.x) / FORCE_VECTOR.x

  // Compute the constant time between each grid line intersection.
  if (alsoComputeIntersectionInterval)
   timeBetweenIntersections.x = 1 / Math.abs(FORCE_VECTOR.x)
 }

 // Perform the same steps for the y-axis.
 if (FORCE_VECTOR.y !== 0) {
  const nextGridY = Math.floor(safeIterationResult.point.y) + (FORCE_VECTOR.y > 0)
  timeOfNextIntersection.y = time + (nextGridY - safeIterationResult.point.y) / FORCE_VECTOR.y
  if (alsoComputeIntersectionInterval)
   timeBetweenIntersections.y = 1 / Math.abs(FORCE_VECTOR.y)
 }
}

initalizeRayIntersectionSchedule(true)

const start = _.now

let iteration = 0

// Start iterating on the ray cast.
while (true) {

 iteration++

 // Emergency exit the loop.
 if (_.now - start >= (DELTA_TIME * 1000))
  throw { error: "LOCKED WHILE LOOP", processingTime: _.now - start, iteration, DELTA_TIME, FORCE_VECTOR, speed, safeIterationResult, timeOfNextIntersection, timeBetweenIntersections }

 // Pick the dimension whose grid intersection will happen next.
 const dimension = timeOfNextIntersection.x < timeOfNextIntersection.y ? "x" : "y"

 // Note how much time must elapse to reach that intersection.
 let timeElapsedDuringThisIteration = timeOfNextIntersection[dimension] - time

 // Set the clock to the moment of that intersection.
 time += timeElapsedDuringThisIteration

 // Note if this is a case where the grid intersection is reached after the time limit.
 let ranOutOfTime = time >= DELTA_TIME

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

  // We are at a boundary pixel. Let's move our position to exactly the center of our current point.
  // safeIterationResult.point = Vector.add(Vector.floor(safeIterationResult.point), 0.5)

  // If we have permission to simulate sliding...
  if (ENABLE_SLIDING) {

   // Walk back the clock to before the ray hit.
   time -= timeElapsedDuringThisIteration

   const neighbor = {
    dot: -Infinity,
    point: null,
    triIndex: null,
    direction: {
     x: null,
     y: null
    }
   }

   let boundaryAppearsFlat = false

   // Search the local neighborhood of points for one that we can safely move to.
   for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) {

    // Exclude the point itself
    if (!x && !y)
     continue

    const direction = { x, y }

    // Find out how much of the force vector is cancelled out by going to this neighbor.
    const dot = Vector.dot(Vector.normalize(direction), Vector.normalize(FORCE_VECTOR))

    // If it would require traveling "against" or perpendicular to the force vector, exclude it from consideration.
    if (dot < 0)
     continue

    // Get the position of the center of the neighbor.
    const point = Vector.add(Vector.floor(Vector.add(safeIterationResult.point, direction)), 0.5)
    const triIndex = mesh.triThatContainsPoint(point)

    // If it isn't part of the mesh, exclude it from consideration.
    if (triIndex === -1)
     continue

    // Store the neighbor which most agrees with the force vector.
    if (dot >= neighbor.dot) {
     if (dot < 0.05 && neighbor.dot !== -Infinity && neighbor.dot < 0.05) {
      boundaryAppearsFlat = true
      // Boundary is "flat". Don't allow perpendicular motion.
      neighbor.dot = -Infinity
      neighbor.point = null
      neighbor.triIndex = null
      neighbor.direction.x = null
      neighbor.direction.y = null
     } else {
      boundaryAppearsFlat = false
      neighbor.dot = dot
      neighbor.point = point
      neighbor.triIndex = triIndex
      neighbor.direction = direction
     }
    }
   }

   if (boundaryAppearsFlat) {
    // TODO: Consider using the line through the opposing neighbors to search for assymetry in the mesh boundry.
   }

   // If there is no neighboring point, we are "stuck". The ray cast ends here.
   if (!neighbor.point) {

    // Return the safe result data.
    safeIterationResult.hit = true
    return safeIterationResult
   }

   // Compute travel distance to the center of the neighbor.
   const vectorToNeighbor = Vector.subtract(neighbor.point, safeIterationResult.point)
   const distance = Vector.magnitude(vectorToNeighbor)

   // Construct a force vector pointing to the chosen neighbor.
   // TODO: speed should actually be reduced.
   const forceVectorToNeighbor = Vector.multiply(Vector.normalize(vectorToNeighbor), speed)

   // Compute travel time to reach the neighbor.
   timeElapsedDuringThisIteration = distance / speed

   // Move the clock ahead to our arrival at the neighbor.
   time += timeElapsedDuringThisIteration

   // Check again if we ran out of time.
   ranOutOfTime = time >= DELTA_TIME
   if (ranOutOfTime) {
    const overshootTime = time - DELTA_TIME
    timeElapsedDuringThisIteration -= overshootTime
    time = DELTA_TIME

    // Construct the point along the way to the neighbor.
    const point = Vector.add(safeIterationResult.point, Vector.multiply(forceVectorToNeighbor, timeElapsedDuringThisIteration))
    const triIndex = mesh.triThatContainsPoint(point)
    safeIterationResult.forceVector = forceVectorToNeighbor

    if (triIndex === -1) {
     // We didn't have enough time to overcome the diagonal boundary.

     if (speed * DELTA_TIME > Math.SQRT2) {
      // The current speed is enough to overcome diagonal corners.

      // Return the previous safe point, chalking the lost time up to friction.
      return safeIterationResult
     }

     // There is not enough velocity to overcome the diagonal. Use random chance.
     if (Math.random() < Math.SQRT1_2) {
      safeIterationResult.point = neighbor.point
      safeIterationResult.triIndex = neighbor.triIndex
     }

     return safeIterationResult
    } else {

     // Go to the partial point.
     safeIterationResult.point = point
     safeIterationResult.triIndex = triIndex
    }

    return safeIterationResult

    // TODO: Consider moving toward a 4-point neighbor instead.
   }

   // Set the neighbor as the new safe point.
   safeIterationResult.point = neighbor.point
   safeIterationResult.triIndex = neighbor.triIndex
   safeIterationResult.forceVector = FORCE_VECTOR

   // The normal ray intersection schedule has changed.
   initalizeRayIntersectionSchedule()

   // Proceed with normal ray casting behavior from this point.
   continue

  } else {

   // Discard the unsafe point and return the safe result data.
   safeIterationResult.hit = true
   return safeIterationResult
  }
 }


 // Otherwise, update the safe result.
 safeIterationResult.point = point
 safeIterationResult.triIndex = triIndex

 // If we ran out of time...
 if (ranOutOfTime) {

  // We're done. Return the safe point.
  return safeIterationResult
 }

 // Otherwise, Prepare for the next grid line time of this dimension.
 timeOfNextIntersection[dimension] += timeBetweenIntersections[dimension]
}