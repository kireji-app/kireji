if (thisPart.totalInheritors !== undefined)
 return thisPart.totalInheritors

let totalInheritors = 0

for (const inheritor of thisPart.inheritors)
 totalInheritors += 1 + inheritor.countAndSortInheritors()

define(thisPart, { totalInheritors: { value: totalInheritors } })

if (thisPart.inheritors.length > 1)
 thisPart.inheritors.sort((a, b) => (b.totalInheritors - a.totalInheritors) || (a.host > b.host ? 1 : -1))

if (!thisPart.isInstance && totalInheritors === 0 && _.command === "debug")
 warn(error("unused abstract"))

return totalInheritors