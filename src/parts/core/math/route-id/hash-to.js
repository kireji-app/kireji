if (typeof INPUT_RID !== "bigint")
 throw new RangeError(`Segment encoder can only encode a bigint type (got ${typeof INPUT_RID})`)

if (INPUT_RID < 0n)
 throw new RangeError("Segment encoder can't encode a negative RID.")

let charmCount = 0n
let charmIndex
let reducedRID = INPUT_RID

while (reducedRID > 0n) {

 charmIndex = 2n ** (charmCount * 6n)

 if (reducedRID >= charmIndex) {
  reducedRID -= charmIndex
  charmCount++
 } else break
}

let charmLengthOffset = 0n

for (let i = 0n; i < charmCount; i++)
 charmLengthOffset += 2n ** (i * 6n)

const binaryString = (INPUT_RID - charmLengthOffset).toString(2)
const charmRoundedBinaryLength = Number(charmCount) * 6
const charmRoundedBinaryString = binaryString.padStart(charmRoundedBinaryLength, "0")

let hash = ""
for (let i = 0; i < charmRoundedBinaryLength; i += 6)
 hash += RID.radix[parseInt(charmRoundedBinaryString.slice(i, i + 6), 2)]

return hash