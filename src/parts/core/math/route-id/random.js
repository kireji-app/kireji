if (typeof CARDINALITY !== "bigint" || CARDINALITY < 0n)
 throw new RangeError("Random BigInt error: Cardinality must be a bigint greater than 0.")

if (CARDINALITY === 1n)
 return 0n

const bitCount = RID.toBits(CARDINALITY, false)
const byteCount = Math.ceil(bitCount / 8)
const bytes = new Uint8Array(byteCount)
const finalByteMask = (1 << (bitCount % 8 || 8)) - 1

while (true) {

 crypto.getRandomValues(bytes)

 bytes[byteCount - 1] &= finalByteMask

 let value = 0n

 for (const b of bytes)
  value = (value << 8n) | BigInt(b)

 if (value < CARDINALITY)
  return value
}