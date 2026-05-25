const { points, tris } = mesh.manifest

const data = { collision: [[], []] }

// TODO: add a y coordinate use a default 0 for 2D meshes.
for (let index = 0; index < points.length; index += 2)
 data.collision[0].push([Math.round(points[index]), Math.round(points[index + 1])])

for (let index = 0; index < tris.length; index += 3)
 data.collision[1].push([tris[index], tris[index + 1], tris[index + 2]])

return data