if (!thisMatch.enabled || thisMatch.length === 0)
 return null

return thisMatch.arm.cardinality === 1n ? thisMatch.arm.key : {
 [thisMatch.arm.key]: thisMatch.arm.model
}