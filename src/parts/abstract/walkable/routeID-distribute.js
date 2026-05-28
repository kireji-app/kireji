walkable.updateRouteID(ROUTE_ID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

// Binary search better than embedded match.
walkable.triIndex = (() => {

 let low = 0
 let high = walkable.triTable.length - 1

 while (low <= high) {

  const mid = (low + high) >>> 1
  const triData = walkable.triTable[mid]
  const nextTriData = walkable.triTable[mid + 1]

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

ROUTE_ID -= walkable.triTable[walkable.triIndex].offset

// Embedded match can become binary search later.
for (const row of walkable.triTable[walkable.triIndex].rows) {

 if (!row)
  continue

 const rowWidth = BigInt(row.xyRange.max.x - row.xyRange.min.x + 1)

 if (ROUTE_ID < row.offset + rowWidth) {
  walkable.position.x = row.xyRange.min.x + Number(ROUTE_ID - row.offset)
  walkable.position.z = row.z
  break
 }
}