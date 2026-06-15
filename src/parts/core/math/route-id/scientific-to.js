const base10String = CARDINALITY.toString(10)
const log10 = base10String.length - 1
const significantDigits = Math.round((base10String[0] ?? 0) + (base10String[1] ?? 0) + (base10String[2] ?? 0) + (base10String[3] ?? "0") + "." + (base10String[4] ?? "0")).toString()
const coefficient = `${significantDigits.slice(0, 1)}.${significantDigits.slice(1)}`

return AS_HTML
 ? /* html */`<math><mn>${coefficient}</mn><mo>&sdot;</mo><msup><mn>10</mn><mn>${log10}</mn></msup></math>`
 : `${coefficient} × 10` + [...log10.toString()].map(n => '⁰¹²³⁴⁵⁶⁷⁸⁹'[n]).join("")