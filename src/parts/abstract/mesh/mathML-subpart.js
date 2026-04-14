if (DEPTH <= 0)
 return [
  `<munder><mo>∑</mo><mrow><mi>t</mi><mo>∈</mo><mi>tris</mi><mo>(</mo><msub><mi>𝑝</mi><mi>${mesh.key}</mi></msub><mo>)</mo></mrow></munder>`,
  `<munder><mo>∑</mo><mrow><mi>r</mi><mo>∈</mo><mi>rows</mi><mo>(</mo><mi>t</mi><mo>)</mo></mrow></munder>`,
  `<msub><mi>𝑘</mi><mi>r</mi></msub>`
 ]

return /*mesh.triTable.length > 20 ? base(DEPTH) :*/ mesh.triTable.flatMap(triData => {
 return [`<mn>${triData.cardinality}</mn>`, "<mo>+</mo>"]
}).slice(0, -1)