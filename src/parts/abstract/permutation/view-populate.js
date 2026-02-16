if (client.hydrated) {
 // TODO: Consider if this should be distribute view populate instead of just view populate.
 const hasNoInstances = !permutation.instances.length

 if (permutation.instances.length !== permutation.viewedInstances.length || permutation.viewedPermutationRouteID !== permutation.permutationRouteID || permutation.viewedPayloadRouteID !== permutation.payloadRouteID) {
  // TODO: This is a dead-simple approach ... more performant approaches exist.
  const existingInstanceCount = permutation.viewedInstances.length
  const targetInstanceCount = permutation.instances.length
  const maxLength = Math.max(existingInstanceCount, targetInstanceCount)

  for (let i = 0; i < maxLength; i++) {
   if (targetInstanceCount <= i) {
    permutation.removeInstanceView(permutation.viewedInstances[i], i)
    continue
   }

   const newInstance = permutation.instances[i]
   const existingInstance = permutation.viewedInstances[i]
   const newSubject = newInstance && permutation.instanceToSubject(newInstance)
   const existingSubject = existingInstance && permutation.instanceToSubject(existingInstance)

   if (existingSubject === newSubject)
    continue

   if (existingInstance) {
    permutation.replaceInstanceView(permutation.instances[i], i)
    continue
   }

   permutation.addInstanceView(permutation.instances[i], i)
  }
  permutation.viewedPermutationRouteID = permutation.permutationRouteID
  permutation.viewedPayloadRouteID = permutation.payloadRouteID
  permutation.viewedInstances = [...permutation.instances]
 }
}