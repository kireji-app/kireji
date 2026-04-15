const n = permutation.supersetSize

return [
 "<mn>1</mn>",
 "<mo>+</mo>",
 `<munderover><mo>∑</mo><mrow><mi>𝑛</mi><mo>=</mo><mn>1</mn></mrow><mi>${n}</mi></munderover>`,
 `<munderover><mo>∏</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><mi>𝑛</mi></mrow></munderover><mrow><mn>${permutation.payloadCardinality}</mn><mo>(</mo><mi>${n}</mi><mo>-</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow>`
]