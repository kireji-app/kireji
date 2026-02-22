// Check current tri first.
if (mesh.triIndex !== -1 && mesh.triContainsPoint(mesh.triIndex, POINT))
 return mesh.triIndex

// Check all tris. TODO: Memoize neighbors.
for (let triIndex = 0; triIndex < mesh.triTable.length; triIndex++)
 if (triIndex !== mesh.triIndex && mesh.triContainsPoint(triIndex, POINT))
  return triIndex

return -1