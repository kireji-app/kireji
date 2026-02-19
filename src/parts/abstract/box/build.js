const { dimensions } = box

if (!Array.isArray(dimensions) || dimensions.some(member => typeof member !== "bigint" && isNaN(member)))
 throw `The "dimensions" property of a box must be an array whose members are numeric.`

const placeValues = []
const placeStates = []
const placeLimits = []

let product = 1n

for (const dimension of dimensions) {
 placeValues.push(product)
 placeStates.push(-1)
 placeLimits.push(dimension)
 product *= BigInt(dimension)
}

box.define({
 cardinality: { value: product },
 placeValues: { value: placeValues },
 placeStates: { value: placeStates },
 placeLimits: { value: placeLimits }
})