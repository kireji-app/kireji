define(thisWalkable, {
 triTable: { value: [] },
 triIndex: { value: -1, writable: true },
 position: { value: Vector.xyz() },
 data: {
  resolve() {
   return thisWalkable.getData()
  }
 },
 cardinality: {
  resolve() {
   let walkableCardinality = 0n

   // Obtain the raw data for this walkable.
   const [pointList, tris] = this.data.walkable

   // Iterate over each tri (array of three point indices) in the data.
   for (const tri of tris) {

    // Prepare the per-tri cardinality sum.
    let triCardinality = 0n

    // Recover the true points of the tri.
    const points = tri.map(pointID => pointList[pointID])

    // Get just the z-coordinate of all the points.
    const zPoints = points.map(point => point[2])

    // Estimate the z-range of this tri.
    const zRange = {
     min: Math.min(...zPoints),
     max: Math.max(...zPoints)
    }

    // Iterate over the range inclusively to populate each row subspace.
    const rows = []
    for (let z = zRange.min; z <= zRange.max; z++) {

     // This irrational offset ensures that all grid points lie vertically in at most one triangular region.
     const offsetRowID = z + (Math.PI / 3.141 - 0.5)

     // Iterate over the 3 lines in order to determine where the edges intersect the given row.
     const intersections = []
     for (let edgeID = 0; edgeID < 3; edgeID++) {

      const pointA = points[edgeID]
      const pointB = points[(edgeID + 1) % 3]

      if ((pointA[2] <= offsetRowID && pointB[2] > offsetRowID) || (pointB[2] <= offsetRowID && pointA[2] > offsetRowID)) {
       const t = (offsetRowID - pointA[2]) / (pointB[2] - pointA[2])
       intersections.push({
        x: pointA[0] + t * (pointB[0] - pointA[0]),
        y: pointA[1] + t * (pointB[1] - pointA[1])
       })
      }
     }

     if (intersections.length < 2) {
      // This row doesn't have a full pixel. Adjust the z-range.
      if (z <= zRange.min + 1) zRange.min = z + 1
      else if (z >= zRange.max - 1) zRange.max = z - 1
      else throw error("unexpected tri geometry")
      continue
     }

     const [min, max] = intersections[0].x <= intersections[1].x
      ? [intersections[0], intersections[1]]
      : [intersections[1], intersections[0]]

     min.x = Math.ceil(min.x)
     max.x = Math.ceil(max.x) - 1

     /** @type {IWalkableTriDataRow} */
     const row = {
      z,
      xyRange: { min, max },
      offset: triCardinality,
      cardinality: BigInt(max.x - min.x + 1)
     }
     rows.push(row)
     triCardinality += row.cardinality
    }

    // Store the tri.
    thisWalkable.triTable.push({
     points,
     zRange,
     rows,
     offset: walkableCardinality,
     cardinality: triCardinality
    })

    walkableCardinality += triCardinality
   }

   return walkableCardinality
  }
 }
})