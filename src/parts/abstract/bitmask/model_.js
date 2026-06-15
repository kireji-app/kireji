const model = []

for (const selectedNode of thisBitmask.selectedNodes)
 model.push(thisBitmask.getModelFromNode(selectedNode))

return model