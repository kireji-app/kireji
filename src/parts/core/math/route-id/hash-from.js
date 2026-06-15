let charmRoundedBinaryString = "0b0"

let charmLengthOffsetBinaryString = "0b0"

for (const character of [...INPUT_HASH]) {

 const characterValue = RID.radix.indexOf(character)

 if (characterValue === -1 || characterValue >= 64)
  throw `Bad Hash Character: ${character}`

 charmRoundedBinaryString += characterValue.toString(2).padStart(6, 0)
 charmLengthOffsetBinaryString += "000001"
}

return BigInt(charmRoundedBinaryString) + BigInt(charmLengthOffsetBinaryString)