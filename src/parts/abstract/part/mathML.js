const equationVariable = EQUATION_TYPE === "variable" || EQUATION_TYPE === "both" ? `${recurse(0, "none", false, false)}<mo>=</mo>` : ""
const equationValue = EQUATION_TYPE === "value" || EQUATION_TYPE === "both" ? `<mo>=</mo>${part.cardinality.toString().length <= 15 ? `<mn>${part.cardinality}</mn>` : `<mrow>${scientific(part.cardinality, true).slice(6, -7)}</mrow>`}` : ""
const expression = (() => {

 if (DEPTH <= 0)
  return `<msub><mi>𝑘</mi><mi>${part.key ?? "ecosystem"}</mi></msub>`

 const terms = part.subpartMathML(DEPTH - 1, LABELS)

 const needsParentheses = PARENTHESIZE && terms.length > 1

 debug(terms)

 // Allow "<mrow>" tag nesting for parentheses.
 return (LABELS ? "<munder>" + (needsParentheses ? "" : "<mrow>") : "") + (needsParentheses ? "<mrow class=parenthetic><mo>(</mo>" : "") + terms.join("") + (needsParentheses ? `<mo>)</mo></mrow>` : "") + (LABELS ? (needsParentheses ? "" : "</mrow>") + `<munder><mo stretchy="true">&#x23df;</mo>${recurse(0, "none", false, false)}</munder></munder>` : "")
})()

const showBracketBelow = DEPTH > 2

return /* html */`${WRAP_IN_MATH_TAG ? "<math displaystyle=true><mrow>" : ""}${equationVariable}${expression}${equationValue}${WRAP_IN_MATH_TAG ? "</mrow></math>" : ""}`