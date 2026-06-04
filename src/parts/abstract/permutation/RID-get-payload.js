const instanceCount = BigInt(INSTANCES.length)

let payloadRID = 0n

for (let currentInstanceIndex = 0; currentInstanceIndex < instanceCount; currentInstanceIndex++)
 payloadRID += thisPermutation.collectInstanceRID(INSTANCES[currentInstanceIndex]) * thisPermutation.payloadSizes[currentInstanceIndex]

return payloadRID