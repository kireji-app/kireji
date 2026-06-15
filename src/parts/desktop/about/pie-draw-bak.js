const offscreenContext = new OffscreenCanvas(CANVAS.width, CANVAS.height).getContext('2d')
/** @type {CanvasRenderingContext2D} */
const onscreenContext = CANVAS.getContext('2d')
const imageData = offscreenContext.createImageData(CANVAS.width, CANVAS.height)
const imageDataArray = imageData.data
const pitch = PITCH_DEGREES * Math.PI / 180;
const radius = Vector.xy(Math.floor((CANVAS.width - 1) / 2), Math.max(1, Math.round(Math.floor((CANVAS.width - 1) / 2) * Math.sin(pitch))))
const depth = Math.round(CYLINDER_HEIGHT * CANVAS.height * Math.cos(pitch))
const centerPoint = Vector.xy(Math.floor(CANVAS.width / 2), Math.floor((CANVAS.height - radius.y * 2 - depth) / 2) + radius.y)
/** @type {{readonly color: RGBColor, readonly shade: RGBColor, readonly maxAngle: number}[]} */
const sliceData = []
const total = SLICES.reduce((sum, slice) => sum + slice.value, 0)
SLICES.forEach(({ color, value }, sliceIndex) => {
 if (typeof color === "string") color = Color.hexToRGB(color)
 sliceData.push({
  color,
  shade: Color.blendRGB(color, WALL_SHADE, "multiply"),
  maxAngle: sliceIndex === SLICES.length - 1 ? Infinity : (sliceIndex ? sliceData[sliceIndex - 1].maxAngle : 0) + value / total * KMath.tau + 1e-9
 })
})

function getSliceFromAngle(lookupAngle) {
 lookupAngle = KMath.mod(lookupAngle - YAW_FRACTION * KMath.tau, KMath.tau)
 for (const slice of sliceData)
  if (lookupAngle <= slice.maxAngle)
   return slice
}

function drawPixel({ x, y }, [r, g, b, a = 255]) {

 if (x < 0 || x >= CANVAS.width || y < 0 || y >= CANVAS.height)
  return

 const pixelIndex = (y * CANVAS.width + x) * 4

 imageDataArray[pixelIndex] = r
 imageDataArray[pixelIndex + 1] = g
 imageDataArray[pixelIndex + 2] = b
 imageDataArray[pixelIndex + 3] = a
}

Vector.forEachPointInHyperrectangle(
 Vector.xy(radius.x, depth + 1),
 point => {
  const dyE = Math.sqrt(Math.max(0, radius.y ** 2 * (1 - point.x ** 2 / radius.x ** 2)))
  point.y += Math.round(dyE)

  // Draw right-hand side pixel.
  drawPixel(
   Vector.add(centerPoint, point),
   getSliceFromAngle(Math.atan2(dyE / radius.y, point.x / radius.x)).shade
  )

  // Draw left-hand side pixel.
  drawPixel(
   Vector.add(centerPoint, Vector.multiply(point, Vector.xy(-1, 1))),
   getSliceFromAngle(Math.atan2(dyE / radius.y, -point.x / radius.x)).shade
  )
 }
)

Vector.forEachPointInHyperellipsoid(
 radius,
 point => drawPixel(
  Vector.add(point, centerPoint),
  getSliceFromAngle(Vector.angleInHyperellipsoid(point, radius)).color
 )
)

offscreenContext.putImageData(imageData, 0, 0)
onscreenContext.drawImage(offscreenContext.canvas, x, y)