const n_tabs = allSubjects.length

return [
 "<mn>1</mn>",
 "<mo>+</mo>",
 `<munderover><mo>∑</mo><mrow><msub><mi>𝑛</mi><mi>tabs</mi></msub><mo>=</mo><mn>1</mn></mrow><mi>${n_tabs}</mi></munderover><mrow><msub><mi>𝑛</mi><mi>tabs</mi></msub><mo>(</mo><msub><mi>𝑛</mi><mi>tabs</mi></msub><mo>+</mo><mn>1</mn><mo>)</mo></mrow>`,
 `<munderover><mo>∏</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mrow><msub><mi>𝑛</mi><mi>tabs</mi></msub></mrow></munderover><mrow><mo>(</mo><mi>${n_tabs}</mi><mo>-</mo><mi>i</mi><mo>+</mo><mn>1</mn><mo>)</mo></mrow>`
]