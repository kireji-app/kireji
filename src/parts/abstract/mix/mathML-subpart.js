const defaultTerm = /* xml */`<mn>1</mn>`

if (DEPTH <= 0 || thisPart.length === 0)
 // Strip the "<math>" tags off.
 return [thisMix.length ? /* xml */`<mo largeop="true">∏</mo><msub><mi>𝑘</mi><msub><mi>𝑝</mi><mi>${thisPart.key ?? _.name}</mi></msub></msub>` : defaultTerm]

const operator = "<mo class=product>&sdot;</mo>"
const factors = thisPart.map(subpart => subpart.mathML(DEPTH - 1, "none", LABELS, true, false)).filter(mathML => mathML !== defaultTerm && mathML !== `<mrow>${defaultTerm}</mrow>`)
return factors.length ? factors.flatMap(factor => [factor, operator]).slice(0, -1) : [defaultTerm]