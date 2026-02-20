mesh.updateRouteID(ROUTE_ID)

// Binary search to find the correct triangleIndex in O(log T)
mesh.triangleIndex = (() => {
 let low = 0
 let high = mesh.triangles.length - 1

 while (low <= high) {
  const mid = (low + high) >>> 1
  const triangle = mesh.triangles[mid]
  const nextTriangle = mesh.triangles[mid + 1]

  if (ROUTE_ID < triangle.offset) {
   high = mid - 1
  } else if (nextTriangle && ROUTE_ID >= nextTriangle.offset) {
   low = mid + 1
  } else {
   return mid
  }
 }
 return 0 // Fallback
})()

const triangle = mesh.triangles[mesh.triangleIndex]
let remainingID = ROUTE_ID - triangle.offset

// Finding the row remains O(R).
// Since rows are also sorted by offset, we could binary search here too
// if triangles are massive (e.g., thousands of pixels tall).
for (const row of triangle.rows) {
 if (!row) continue
 const rowWidth = BigInt(row.xMax - row.xMin + 1)
 if (remainingID < row.offset + rowWidth) {
  mesh.y = row.y
  mesh.x = row.xMin + Number(remainingID - row.offset)
  break
 }
}