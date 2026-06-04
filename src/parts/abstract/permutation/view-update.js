if (thisPermutation.instances.length !== thisPermutation.viewedInstances.length || thisPermutation.viewedPermutationRID !== thisPermutation.permutationRID) {
 const existingInstanceCount = thisPermutation.viewedInstances.length
 const targetInstanceCount = thisPermutation.instances.length
 const maxLength = Math.max(existingInstanceCount, targetInstanceCount)

 for (let i = 0; i < maxLength; i++) {
  if (targetInstanceCount <= i) {
   thisPermutation.removeInstanceView(thisPermutation.viewedInstances[i], i)
   continue
  }

  const newInstance = thisPermutation.instances[i]
  const existingInstance = thisPermutation.viewedInstances[i]
  const newSubject = newInstance && thisPermutation.instanceToSubject(newInstance)
  const existingSubject = existingInstance && thisPermutation.instanceToSubject(existingInstance)

  if (existingSubject === newSubject)
   continue

  if (existingInstance) {
   thisPermutation.replaceInstanceView(thisPermutation.instances[i], i)
   continue
  }

  thisPermutation.addInstanceView(thisPermutation.instances[i], i)
 }

 thisPermutation.viewedPermutationRID = thisPermutation.permutationRID
 thisPermutation.viewedInstances = [...thisPermutation.instances]
}