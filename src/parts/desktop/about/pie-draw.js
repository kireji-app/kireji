const pitch = PITCH_FRACTION * KMath.tau

const yaw = YAW_FRACTION * KMath.tau

const palette = [[0, 0, 0]] // Include transparent background.
const outlineIndex = palette.push(Color.arm === Color.dark ? Color.hexToRGB(Color.modeErFg) : [0, 0, 0]) - 1

const radius = Vector.xy(
 Math.floor((WIDTH - 1) / 2),
 Math.max(1, Math.round(Math.floor((WIDTH - 1) / 2) * Math.sin(pitch)))
)

const depth = Math.round(CYLINDER_HEIGHT_FRACTION * HEIGHT * Math.cos(pitch))

const total = SLICES.reduce((sum, slice) => sum + slice.value, 0)

/** @type {{readonly colorIndex: number, readonly shadeIndex: number, readonly maxAngle: number}[]} */
const sliceData = SLICES.reduce((sliceData, { color, value }, sliceIndex) => {
 if (typeof color === "string") color = Color.hexToRGB(color)
 const colorIndex = palette.push(color) - 1
 const shadeIndex = palette.push(Color.blendRGB(color, WALL_SHADE, "multiply")) - 1
 sliceData.push({
  colorIndex,
  shadeIndex,
  maxAngle: sliceIndex === SLICES.length - 1
   ? Infinity
   : (sliceIndex ? sliceData[sliceIndex - 1].maxAngle : 0)
   + value / total * KMath.tau
   + (sliceIndex === 0 ? 1e-9 : 0)
 })
 return sliceData
}, [])

function getSliceFromAngle(lookupAngle) {
 lookupAngle = KMath.mod(lookupAngle - yaw, KMath.tau)
 for (const slice of sliceData)
  if (lookupAngle <= slice.maxAngle)
   return slice
}

const pixelIndices = new Uint8Array(WIDTH * HEIGHT)

const centerPoint = Vector.xy(
 Math.floor(WIDTH / 2),
 Math.floor((HEIGHT - radius.y * 2 - depth) / 2) + radius.y
)

function drawPixel(point, paletteIndex) {
 const { x, y } = Vector.add(point, centerPoint)
 if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return
 pixelIndices[y * WIDTH + x] = paletteIndex
}

// Front wall.
Vector.forEachPointInHyperrectangle(Vector.xy(radius.x, depth + 1), point => {
 const dyE = Math.sqrt(Math.max(0, radius.y ** 2 * (1 - point.x ** 2 / radius.x ** 2)))
 // if (dyE < 0.5) return
 point.y += Math.round(dyE)
 drawPixel(point, getSliceFromAngle(Math.atan2(dyE / radius.y, point.x / radius.x)).shadeIndex)
 point = Vector.multiply(point, Vector.xy(-1, 1))
 drawPixel(point, getSliceFromAngle(Math.atan2(dyE / radius.y, point.x / radius.x)).shadeIndex)
})

// Front wall bottom edge outline.
Vector.forEachPointOnHyperellipsoid(radius, point => {
 if (point.y > 0)
  drawPixel(Vector.add(point, Vector.xy(0, depth + 1)), outlineIndex)
})

// Left and right vertical wall edges.
for (let dy = 0; dy <= depth + 1; dy++) {
 drawPixel(Vector.xy(-radius.x, dy), outlineIndex)
 drawPixel(Vector.xy(radius.x, dy), outlineIndex)
}

// Top ellipse fill.
Vector.forEachPointInHyperellipsoid(radius, point =>
 drawPixel(point, getSliceFromAngle(Vector.angleInHyperellipsoid(point, radius)).colorIndex)
)

const boundaryAngles = [
 ...sliceData.slice(0, -1).map(({ maxAngle }) => maxAngle + yaw),
 yaw,
]

// Top ellipse outline.
Vector.forEachPointOnHyperellipsoid(radius, point =>
 drawPixel(point, outlineIndex)
)

for (const angle of boundaryAngles) {
 const ex = Math.round(radius.x * Math.cos(angle))
 const ey = Math.round(radius.y * Math.sin(angle))

 // Top surface radial line.
 const steps = Math.max(Math.abs(ex), Math.abs(ey))
 for (let i = 0; i <= steps; i++) {
  const t = steps === 0 ? 0 : i / steps
  drawPixel(Vector.round(Vector.lerp(Vector.xy(), Vector.xy(ex, ey), t)), outlineIndex)
 }

 // Wall divider — front face only.
 if (Math.sin(angle) >= 0)
  for (let dy = 0; dy <= depth; dy++)
   drawPixel(Vector.xy(ex, ey + dy), outlineIndex)
}

return PNG.encode(WIDTH, HEIGHT, pixelIndices, palette, 4)