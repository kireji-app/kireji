const activePartCardinality = activePart.cardinality
const cardinalityAsString = instances.includes(activePart) ? activePartCardinality.toLocaleString() : null

return (
 instances.includes(activePart) ? (
  "<h3>Cardinality</h3>" +
  `<p>${cardinalityAsString.length < 16 ? cardinalityAsString : scientific(activePartCardinality, true)}</p>` +
  `<hr>` +
  "<h3>Hartley Entropy</h3>" +
  `<p>${toCharms(activePartCardinality)} (${toBits(activePartCardinality)})</p>` +
  `<hr>` +
  `<h3>Equation</h3>` +
  "<math>" + activePart["equation-variable.html"] + "<mo>=</mo>" + activePart["equation.html"] + "</math>"
 ) : (
  "<p class=disabled-message>Abstract parts do not have a concrete state space.</p>"
 )
)