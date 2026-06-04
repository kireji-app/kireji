const parts = []

for (const subpart of thisPart)
 parts.push(MAP_FUNCTION(subpart, subpart.index, thisPart))

return parts