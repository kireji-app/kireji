const subtreeSums = KMath.createLSB(SIZE)
const Type = KMath.constructorOf(SIZE)
const zero = Type(0)
const one = Type(1)
const two = Type(2)
const powerFloor = two ** Type(SIZE.toString(2).length - 1)
const cachedLSB = KMath.cachedLSB.get(Type)

/** @type {IFenwickTree} */
const handler = {

 add(index, value = one) {
  for (; index < SIZE; index += cachedLSB[index])
   subtreeSums[index] += value
 },

 set(index, value = one) {
  const current = index > zero ? this.partialSum(index) - this.partialSum(index - one) : this.partialSum(index)
  this.add(index, value - current)
 },

 remove(i) {
  this.set(i, zero)
 },

 partialSum(lastIndex) {
  let sum = zero
  for (; lastIndex >= zero; lastIndex -= cachedLSB[lastIndex])
   sum += subtreeSums[lastIndex]
  return sum
 },

 sumOverRange(firstIndex, lastIndex) {
  return this.partialSum(lastIndex) - (firstIndex > zero ? this.partialSum(firstIndex - one) : zero)
 },

 indexOfPartialSum(threshold, assumeBinary = true) {
  if (assumeBinary) {
   let index = zero
   for (let powerOfTwo = powerFloor; powerOfTwo > zero; powerOfTwo /= two) {
    const i = index + powerOfTwo
    if (i <= SIZE && subtreeSums[i - one] <= threshold) {
     threshold -= subtreeSums[i - one]
     index = i
    }
   }
   return index
  } else {
   // TODO: Fix this. It is not working right.
   let lo = zero, hi = SIZE - one
   while (lo < hi) {
    const mid = (lo + hi) / two
    if (this.partialSum(mid) < threshold) lo = mid + one
    else hi = mid
   }
   return this.partialSum(lo) >= threshold ? lo : -one
  }
 }
}

return handler