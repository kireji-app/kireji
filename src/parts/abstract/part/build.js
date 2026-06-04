thisPart.subparts.sort((() => {

 if (Array.isArray(thisPart.manifest.order)) {
  // If there is a custom order defined, just used that.
  return (a, b) => thisPart.manifest.order.indexOf(a.key) - thisPart.manifest.order.indexOf(b.key)
 }

 /* Otherwise, sort ascending by cardinality to optimize RID encoding:
  1. In mix parts, using the largest factor as the most significant digit
     prevents its large cardinality from being a multiplier for other factors.
  2. In match parts, placing larger arms at the end of the address space
     prevents their large cardinalities from being offsets for smaller arms. */
 return (a, b) => {
  /* Relational comparisons are used to avoid BigInt subtraction which
     would unnecessarily compute and store a third BigInt. */
  if (a.cardinality < b.cardinality) return -1
  if (a.cardinality > b.cardinality) return 1
  return 0
 }
})())

define(thisPart, {
 dirty: { value: false, writable: true },
 rid: { value: -1n, writable: true },
 deltaRID: { value: 0n, writable: true },
 enabled: { value: false, writable: true },
 disabled: { value: true, writable: true },
 cardinality: { value: 1n, configurable: true },
 previousRID: { value: -1n, writable: true },
 wasEnabled: { value: false, writable: true },
 justEnabled: { value: false, writable: true },
 justDisabled: { value: false, writable: true },
 callbacks: {
  value: {
   add: {},
   update: {},
   remove: {}
  }
 }
})