mesh.define({
 triangles: { value: [] },
 x: { value: null, writable: true },
 y: { value: null, writable: true },
 triangleIndex: { value: null, writable: true },
 cardinality: {
  resolve() {
   let meshCardinality = 0n

   // Iterate over each triangle (array of three points) in the raw data.
   for (const points of mesh.getData()) {

    // Get the y-range of the triangle.
    const minY = Math.min(...points.map(point => point[1]))
    const maxY = Math.max(...points.map(point => point[1]))
    const rows = []
    let triangleCardinality = 0n

    // Iterate over the y-range inclusively to populate each row subspace.
    for (let y = minY; y <= maxY; y++) {

     // Using exactly 0.5 can cause occasional overlapping pixels in two different triangles.
     const py = y + 0.49999
     const intersections = []

     // Iterate over the 3 lines in order to determine where the edges intersect the given row.
     for (let i = 0; i < 3; i++) {
      const p1 = points[i]
      const p2 = points[(i + 1) % 3]
      if ((p1[1] <= py && p2[1] > py) || (p2[1] <= py && p1[1] > py))
       intersections.push(p1[0] + ((py - p1[1]) / (p2[1] - p1[1])) * (p2[0] - p1[0]))
     }

     if (intersections.length < 2) {
      // There is no pixel here.
      rows.push(null)
      continue
     }

     // Memoize the row.
     const row = { y, xMin: Math.ceil(Math.min(...intersections)), xMax: Math.floor(Math.max(...intersections)), offset: triangleCardinality }
     rows.push(row)
     triangleCardinality += BigInt(row.xMax - row.xMin + 1)
    }

    // Memoize the triangle.
    mesh.triangles.push({ points, minY, maxY, rows, offset: meshCardinality, cardinality: triangleCardinality })
    meshCardinality += triangleCardinality
   }

   return meshCardinality
  }
 }
})