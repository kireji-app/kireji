const activePartCardinality = activePart.cardinality
const cardinalityAsString = instances.includes(activePart) ? activePartCardinality.toLocaleString() : null

return (
 instances.includes(activePart) ? (
  `<h3>Equation</h3>` +
  activePart.mathML(1 + (activePart.length <= 4), "variable") +
  `<hr>` +
  "<h3>Cardinality</h3>" +
  activePart.mathML(0, "value") +
  `<hr>` +
  "<h3>Hartley Entropy</h3>" +
  `<math><mn>${toCharms(activePartCardinality, false)}</mn><mspace width=".5ch"/><mtext>charms</mtext><mspace width=".5ch"/><mo>(</mo><mn>${toBits(activePartCardinality, false)}</mn><mspace width=".5ch"/><mtext>bits</mtext><mo>)</mo></math>`
 ) : (
  "<p class=disabled-message>Abstract parts do not have a concrete state space.</p>"
 )
)