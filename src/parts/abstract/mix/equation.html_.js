return "<math>" + (
 mix.length ? (
  mix.length > 4 ? (
   `<mo>∏</mo><msub><mi>𝑘</mi><mi>𝑝</mi></msub><mtext>,</mtext><mspace width="0.5em"/><mi>𝑝</mi><mo>∈</mo><mi>subparts</mi><mo>(</mo><msub><mi>P</mi><mi>${part.key ?? "ecosystem"}</mi></msub><mo>)</mo>`
  ) : (
   mix.map(factor => factor["equation-variable.html"]).join("<mo>&sdot;</mo>")
  )
 ) : (
  "<mn>1</mn>"
 )
) + "</math>"