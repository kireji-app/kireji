mesh.updateRouteID(ROUTE_ID)

// Binary search better than embedded match.
mesh.triIndex = (() => {

 let low = 0
 let high = mesh.triTable.length - 1

 while (low <= high) {

  const mid = (low + high) >>> 1
  const triData = mesh.triTable[mid]
  const nextTriData = mesh.triTable[mid + 1]

  if (ROUTE_ID < triData.offset)
   high = mid - 1
  else if (nextTriData && ROUTE_ID >= nextTriData.offset)
   low = mid + 1
  else
   return mid
 }

 // Fallback.
 return 0
})()

ROUTE_ID -= mesh.triTable[mesh.triIndex].offset

// Embedded match can become binary search later.
for (const row of mesh.triTable[mesh.triIndex].rows) {

 if (!row)
  continue

 const rowWidth = BigInt(row.range.max - row.range.min + 1)

 if (ROUTE_ID < row.offset + rowWidth) {
  mesh.position.y = row.y
  mesh.position.x = row.range.min + Number(ROUTE_ID - row.offset)
  break
 }
}