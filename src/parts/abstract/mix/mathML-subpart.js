const defaultTerm = /* xml */`<mn>1</mn>`

if (DEPTH <= 0 || part.length === 0)
 // Strip the "<math>" tags off.
 return [mix.length ? /* xml */`<mo largeop="true">∏</mo><msub><mi>𝑘</mi><msub><mi>𝑝</mi><mi>${part.key ?? "ecosystem"}</mi></msub></msub>` : defaultTerm]

const operator = "<mo class=product>&sdot;</mo>"
const factors = part.map(subpart => subpart.mathML(DEPTH - 1, "none", LABELS, true, false)).filter(mathML => mathML !== defaultTerm && mathML !== `<mrow>${defaultTerm}</mrow>`)
return factors.length ? factors.flatMap(factor => [factor, operator]).slice(0, -1) : [defaultTerm]