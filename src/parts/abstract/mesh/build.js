mesh.define({
 triTable: { value: [] },
 triIndex: { value: -1, writable: true },
 position: { value: { x: null, y: null } },
 cardinality: {
  resolve() {
   let meshCardinality = 0n

   // Obtain the raw data for this mesh.
   const [pointList, tris] = mesh.getData()

   // Iterate over each tri (array of three point indices) in the data.
   for (const tri of tris) {

    // Prepare the per-tri cardinality sum.
    let triCardinality = 0n

    // Recover the true points of the tri.
    const points = tri.map(pointID => pointList[pointID])

    // Get just the y-coordinate of all the points.
    const yPoints = points.map(point => point[1])

    // Estimate the y-range of this tri.
    const range = {
     min: Math.min(...yPoints),
     max: Math.max(...yPoints)
    }

    // Iterate over the range inclusively to populate each row subspace.
    const rows = []
    for (let rowID = range.min; rowID <= range.max; rowID++) {

     // This irrational offset ensures that all grid points lie vertically in at most one triangular region.
     const offsetRowID = rowID + (Math.PI / 3.141 - 0.5)

     // Iterate over the 3 lines in order to determine where the edges intersect the given row.
     const intersections = []
     for (let edgeID = 0; edgeID < 3; edgeID++) {

      const pointA = points[edgeID]
      const pointB = points[(edgeID + 1) % 3]

      if ((pointA[1] <= offsetRowID && pointB[1] > offsetRowID) || (pointB[1] <= offsetRowID && pointA[1] > offsetRowID))
       intersections.push(pointA[0] + ((offsetRowID - pointA[1]) / (pointB[1] - pointA[1])) * (pointB[0] - pointA[0]))
     }

     if (intersections.length < 2) {
      // This row doesn't have a full pixel. Adjust the range.
      if (rowID <= range.min + 1) range.min = rowID + 1
      else if (rowID >= range.max - 1) range.max = rowID - 1
      else throw new Error("Unexpected tri geometry found in mesh.")
      continue
     }

     /** @type {IMeshTriDataRow} */
     const row = {
      y: rowID,
      range: {
       min: Math.ceil(Math.min(...intersections)),
       max: Math.ceil(Math.max(...intersections)) - 1,
      },
      offset: triCardinality
     }
     rows.push(row)
     triCardinality += BigInt(row.range.max - row.range.min + 1)
    }

    // Store the tri.
    mesh.triTable.push({
     points,
     range,
     rows,
     offset: meshCardinality,
     cardinality: triCardinality
    })

    meshCardinality += triCardinality
   }

   return meshCardinality
  }
 }
})