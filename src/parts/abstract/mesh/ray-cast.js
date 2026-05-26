// Define a safe result: the current position before casting.
/** @type {IMeshRayCastResult} */
const safeIterationResult = {
 hit: false,
 triIndex: mesh.triIndex,
 point: {
  x: mesh.position.x,
  y: 0, // Exclude y from ray cast calculations for now.
  z: mesh.position.z
 },
 forceVector: FORCE_VECTOR
}

// Obtain the speed of the force vector, which will be used later if we need to slide along the boundary.
const speed = Vector.magnitude(FORCE_VECTOR)

// Only cast a ray if there's movement happening.
if (speed !== 0) {

 // Initialize timing data as though the vector doesn't intersect any grid lines.
 const timeOfNextIntersection = { x: Infinity, z: Infinity }
 const timeBetweenIntersections = { ...timeOfNextIntersection }

 // Set the clock to zero.
 let time = 0

 function initializeRayIntersectionSchedule(alsoComputeIntersectionInterval) {

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

  // Perform the same steps for the z-axis.
  if (FORCE_VECTOR.z !== 0) {
   const nextGridZ = Math.floor(safeIterationResult.point.z) + (FORCE_VECTOR.z > 0)
   timeOfNextIntersection.z = time + (nextGridZ - safeIterationResult.point.z) / FORCE_VECTOR.z
   if (alsoComputeIntersectionInterval)
    timeBetweenIntersections.z = 1 / Math.abs(FORCE_VECTOR.z)
  }
 }

 initializeRayIntersectionSchedule(true)

 const start = _.now

 let iteration = 0

 // Start iterating on the ray cast.
 castRay: while (true) {

  iteration++

  // Emergency exit the loop.
  if (_.now - start >= 2000) {
   warn("Mesh ray cast calculation exceeded the maximum allowable processing time of 2 seconds.", { processingTime: _.now - start, iteration, DELTA_TIME, FORCE_VECTOR, speed, safeIterationResult, timeOfNextIntersection, timeBetweenIntersections })
   break castRay
  }

  // Pick the dimension whose grid intersection will happen next.
  const dimension = timeOfNextIntersection.x < timeOfNextIntersection.z ? "x" : "z"

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
      z: null
     }
    }

    let boundaryAppearsFlat = false

    // Search the local neighborhood of points for one that we can safely move to.
    for (let x = -1; x <= 1; x++) for (let z = -1; z <= 1; z++) {

     // Exclude the point itself
     if (!x && !z)
      continue

     const direction = { x, y: 0, z }

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
       neighbor.direction.z = null
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
     // Do nothing for now...
    }

    // If there is no neighboring point, we are "stuck". The ray cast ends here.
    if (!neighbor.point) {

     // Return the safe result data.
     safeIterationResult.hit = true
     break castRay
    }

    // Compute travel distance to the center of the neighbor.
    const vectorToNeighbor = Vector.subtract(neighbor.point, safeIterationResult.point)
    const distance = Vector.magnitude(vectorToNeighbor)

    // Construct a force vector pointing to the chosen neighbor.
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
       break castRay
      }

      // There is not enough velocity to overcome the diagonal. Use random chance.
      if (Math.random() < Math.SQRT1_2) {
       safeIterationResult.point = neighbor.point
       safeIterationResult.triIndex = neighbor.triIndex
      }

      break castRay
     } else {

      // Go to the partial point.
      safeIterationResult.point = point
      safeIterationResult.triIndex = triIndex
     }

     break castRay
    }

    // Set the neighbor as the new safe point.
    safeIterationResult.point = neighbor.point
    safeIterationResult.triIndex = neighbor.triIndex
    safeIterationResult.forceVector = FORCE_VECTOR

    // The normal ray intersection schedule has changed.
    initializeRayIntersectionSchedule()

    // Proceed with normal ray casting behavior from this point.
    continue

   } else {

    // Discard the unsafe point. Return the safe result data.
    safeIterationResult.hit = true
    break castRay
   }
  }


  // Otherwise, update the safe result.
  safeIterationResult.point = point
  safeIterationResult.triIndex = triIndex

  // If we ran out of time...
  if (ranOutOfTime) {

   // We're done. Return the safe point.
   break castRay
  }

  // Otherwise, Prepare for the next grid line time of this dimension.
  timeOfNextIntersection[dimension] += timeBetweenIntersections[dimension]
 }
}

// Interpolate the y position of the collision mesh at the given { x, y } coordinates.
const triData = mesh.triTable[safeIterationResult.triIndex]
const flooredZ = Math.floor(safeIterationResult.point.z)
const row = triData.rows[flooredZ - triData.zRange.min]
const t = (safeIterationResult.point.x - row.xyRange.min.x) / Number(row.cardinality)
safeIterationResult.point.y = row.xyRange.min.y + t * (row.xyRange.max.y - row.xyRange.min.y)

if (isNaN(safeIterationResult.point.y))
 throw {
  triData,
  flooredZ,
  row,
  t
 }
return safeIterationResult