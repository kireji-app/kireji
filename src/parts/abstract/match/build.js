match.define({
 arm: { value: null, writable: true },
 offsets: { value: new Map() },
 cardinality: {
  resolve() {
   let sum = 0n

   if (this.length === 0)
    sum = 1n
   else for (const subpart of this) {
    this.offsets.set(subpart, sum)
    sum += subpart.cardinality
   }

   return sum
  }
 }
})