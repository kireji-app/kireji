const Type = KMath.constructorOf(SIZE)

const cache = KMath.cachedLSB.get(Type)
const oldCacheSize = Type(cache.length)
const one = Type(1)

for (let newCacheSize = oldCacheSize + one; newCacheSize <= SIZE; newCacheSize++)
 cache[newCacheSize - one] = newCacheSize & -newCacheSize

return cache.slice(0, Number(SIZE))