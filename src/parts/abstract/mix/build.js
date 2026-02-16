mix.define({
 placeValues: { value: new Map() },
 cardinality: {
  resolve() {
   let product = 1n

   for (const factor of this) {
    this.placeValues.set(factor, product)
    product *= factor.cardinality
   }

   return product
  }
 }
})