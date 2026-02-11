setUndoPoint()

permutation.permutationRouteID = permutation.getPermutationRouteID(permutation.instances)
permutation.payloadRouteID = permutation.getPayloadRouteID(permutation.instances)

const
 instanceCount = permutation.instances.length,
 summarizedRouteID = permutation.instanceOffsets[instanceCount] +
  permutation.permutationRouteID
  * permutation.payloadSizes[instanceCount]
  + permutation.payloadRouteID

if (permutation.routeID !== summarizedRouteID)
 permutation.setRouteID(summarizedRouteID)