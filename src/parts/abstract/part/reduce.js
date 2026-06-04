let index = 0

if (INITIAL_VALUE === undefined) {
 INITIAL_VALUE = thisPart.subparts[0]
 index = 1
}

for (; index < thisPart.subparts.length; index++) {
 const subpart = thisPart.subparts[index]
 INITIAL_VALUE = REDUCE_FUNCTION(INITIAL_VALUE, subpart, subpart.index, thisPart)
}

return INITIAL_VALUE