/** @type {IPartAny} */
const activePart = KirejiTabGroup.activeTab.subject

return (
 activePart.isInstance ? (
  `<h3>Equation</h3>` +
  activePart.mathML(1 + (activePart.length <= 4), "variable") +
  "<h3>Cardinality</h3>" +
  activePart.mathML(0, "value") +
  "<h3>Hartley Entropy</h3>" +
  `<math><mn>${RID.toCharms(activePart.cardinality, false)}</mn><mspace width=".5ch"/><mtext>charms</mtext><mspace width=".5ch"/><mo>(</mo><mn>${RID.toBits(activePart.cardinality, false)}</mn><mspace width=".5ch"/><mtext>bits</mtext><mo>)</mo></math>`
 ) : (
  "<p class=disabled-message>Abstract parts do not have a concrete state space.</p>"
 )
)