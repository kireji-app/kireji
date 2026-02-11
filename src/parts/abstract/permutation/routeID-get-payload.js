const instanceCount = BigInt(INSTANCES.length)

let payloadRouteID = 0n

for (let currentInstanceIndex = 0; currentInstanceIndex < instanceCount; currentInstanceIndex++)
 payloadRouteID += permutation.collectInstanceRouteID(INSTANCES[currentInstanceIndex]) * permutation.payloadSizes[currentInstanceIndex]

return payloadRouteID