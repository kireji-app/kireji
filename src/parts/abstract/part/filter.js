const parts = []

for (const subpart of thisPart)
 if (FILTER_FUNCTION(subpart, subpart.index, thisPart))
  parts.push(subpart)

return parts