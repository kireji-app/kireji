const { points, tris } = walkable.manifest

const data = { walkable: [[], []] }

for (let index = 0; index < points.length; index += 2)
 data.walkable[0].push([Math.round(points[index]), 0, Math.round(points[index + 1])])

for (let index = 0; index < tris.length; index += 3)
 data.walkable[1].push([tris[index], tris[index + 1], tris[index + 2]])

return data