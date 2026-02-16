const model = {}

for (const factor of mix)
 if (factor.cardinality !== 1n)
  model[factor.key] = factor.model

return model