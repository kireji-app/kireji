const validInstances = []

for (let i = 0n; i < MODEL.instances.length; i++) {
 try {
  validInstances.push(permutation.instanceFromModel(MODEL.instances[i]))
 } catch (e) {
  warn(e)
 }
}

const numberOfInstances = validInstances.length

const resultRouteID = permutation.instanceOffsets[numberOfInstances] +
 permutation.getPermutationRouteID(validInstances)
 * permutation.payloadSizes[numberOfInstances]
 + permutation.getPayloadRouteID(validInstances)

if (resultRouteID >= part.cardinality)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a route ID that was too large (${resultRouteID}) (max ${part.cardinality}).`)

if (resultRouteID < 0n)
 throw new RangeError(`Model To RouteID Error: Part "${part.host}" returned a negative route ID.`)

return resultRouteID