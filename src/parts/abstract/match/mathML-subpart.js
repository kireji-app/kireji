const defaultTerm = /* xml */`<mn>1</mn>`

if (DEPTH <= 0 || thisPart.length === 0)
 // Strip the "<math>" tags off.
 return [thisMatch.length ? /* xml */`<mo largeop="true">∑</mo><msub><mi>𝑘</mi><msub><mi>𝑝</mi><mi>${thisPart.key ?? _.name}</mi></msub></msub>` : defaultTerm]

const operator = "<mo>+</mo>"
const addends = thisPart.map(addend => addend.mathML(DEPTH - 1, "none", LABELS, true, false))
return addends.length ? addends.flatMap(addend => [addend, operator]).slice(0, -1) : [defaultTerm]