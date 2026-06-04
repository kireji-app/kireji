if (DEPTH <= 0)
 return [/* xml */`<mi>frames</mi><mo>(</mo><msub><mi>𝑝</mi><mi>${thisClip.key}</mi></msub><mo>)</mo>`]

return [`<mn>${thisClip.cardinality}</mn>`]