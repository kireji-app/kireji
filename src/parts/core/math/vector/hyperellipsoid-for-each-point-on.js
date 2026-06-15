if (typeof VECTOR_OR_NUMBER === "number") {
 const coord = Math.round(VECTOR_OR_NUMBER)
 VECTOR_LOOP_CALLBACK(coord, 0)
 if (coord !== 0) VECTOR_LOOP_CALLBACK(-coord, 1)
 return
}

const n = VECTOR_OR_NUMBER.data.length
const point = Vector.copy(VECTOR_OR_NUMBER)
const seen = new Set()
let index = 0

for (let freeAxis = 0; freeAxis < n; freeAxis++) {
 const axes = [...Array.from({ length: n }, (_, i) => i).filter(i => i !== freeAxis), freeAxis]

 const loopOverDimension = (step, remaining) => {
  const i = axes[step]

  if (step === n - 1) {
   const coord = Math.round(VECTOR_OR_NUMBER.data[i] * Math.sqrt(Math.max(0, remaining)))
   for (const c of coord === 0 ? [0] : [coord, -coord]) {
    point.data[i] = c
    const key = point.data.join(',')
    if (seen.has(key)) continue
    seen.add(key)
    VECTOR_LOOP_CALLBACK(Vector.copy(point), index++)
   }
   return
  }

  const ri = VECTOR_OR_NUMBER.data[i]
  for (let ci = -Math.floor(ri); ci <= Math.floor(ri); ci++) {
   const used = (ci / ri) ** 2
   if (used > remaining) continue
   point.data[i] = ci
   loopOverDimension(step + 1, remaining - used)
  }
 }

 loopOverDimension(0, 1)
}