define(KMath, {
 tau: {
  value: 2 * Math.PI
 },
 cachedLSB: {
  resolve() {
   const cache = new Map()
   cache.set(Number, [])
   cache.set(BigInt, [])
   return cache
  }
 },
})