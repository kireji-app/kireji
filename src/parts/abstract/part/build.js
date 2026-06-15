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