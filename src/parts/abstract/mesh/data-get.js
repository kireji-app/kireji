const { points, tris } = mesh.manifest

const data = [[], []]

for (let index = 0; index < points.length; index += 2)
 data[0].push([points[index], points[index + 1]])

for (let index = 0; index < tris.length; index += 3)
 data[1].push([tris[index], tris[index + 1], tris[index + 2]])

return data