let resultRID = 0n

for (const model of MODEL) {

 const selectedNode = thisBitmask.getNodeFromModel(model)

 if (!selectedNode) {
  warn(error(`can't find node corresponding to model "${JSON.stringify(model)}"`))
  continue
 }

 resultRID |= 1n << BigInt(selectedNode.index)
}

if (resultRID >= thisPart.cardinality || resultRID < 0n)
 throw error(`RID out of range\n\tRID:${resultRID}\n\tRange: [0, ${thisPart.cardinality}]`)

return resultRID