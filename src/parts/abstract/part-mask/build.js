const superset = thisPartMask.createSuperset()

define(thisPartMask, {
 cardinality: { value: 2n ** BigInt(superset.length) },
 superset: { value: superset },
 chosenParts: { value: new Set() }
})