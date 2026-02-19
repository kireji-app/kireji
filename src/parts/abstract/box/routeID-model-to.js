if (!Array.isArray(MODEL))
 throw new TypeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from a model of type "${typeof MODEL}".`)

if (MODEL.length !== box.placeValues.length)
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from an array with a different length than the number of dimensions the box has.`)

if (MODEL.some(member => isNaN(member)))
 throw new RangeError(`Model To RouteID Error: Box "${box.host}" does not support computing a route ID from an array with element(s) which are not numeric.`)

const resultRouteID = box.placeValues.reduce((resultRouteID, placeValue, i) => resultRouteID + BigInt(placeValue) * BigInt(Math.max(Math.min(Math.round(MODEL[i]), box.placeLimits[i] - 1), 0)), 0n)

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID