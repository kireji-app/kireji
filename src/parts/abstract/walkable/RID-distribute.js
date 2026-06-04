thisWalkable.updateRID(NEW_RID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

// Binary search better than embedded match.
thisWalkable.triIndex = (() => {

 let low = 0
 let high = thisWalkable.triTable.length - 1

 while (low <= high) {

  const mid = (low + high) >>> 1
  const triData = thisWalkable.triTable[mid]
  const nextTriData = thisWalkable.triTable[mid + 1]

  if (NEW_RID < triData.offset)
   high = mid - 1
  else if (nextTriData && NEW_RID >= nextTriData.offset)
   low = mid + 1
  else
   return mid
 }

 // Fallback.
 return 0
})()

NEW_RID -= thisWalkable.triTable[thisWalkable.triIndex].offset

// Embedded match can become binary search later.
for (const row of thisWalkable.triTable[thisWalkable.triIndex].rows) {

 if (!row)
  continue

 const rowWidth = BigInt(row.xyRange.max.x - row.xyRange.min.x + 1)

 if (NEW_RID < row.offset + rowWidth) {
  thisWalkable.position.x = row.xyRange.min.x + Number(NEW_RID - row.offset)
  thisWalkable.position.z = row.z
  break
 }
}