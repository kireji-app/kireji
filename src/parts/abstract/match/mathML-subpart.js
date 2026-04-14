const defaultTerm = /* xml */`<mn>1</mn>`

if (DEPTH <= 0 || part.length === 0)
 // Strip the "<math>" tags off.
 return [match.length ? /* xml */`<mo largeop="true">∑</mo><msub><mi>𝑘</mi><msub><mi>𝑝</mi><mi>${part.key ?? "ecosystem"}</mi></msub></msub>` : defaultTerm]

const operator = "<mo>+</mo>"
const addends = part.map(addend => addend.mathML(DEPTH - 1, "none", LABELS, true, false))
return addends.length ? addends.flatMap(addend => [addend, operator]).slice(0, -1) : [defaultTerm]