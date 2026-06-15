if (environment === "node-main") {

 // Pack metadata for transport.
 const bits = allSubjects.map(subject => {

  if (subject.kind === "part" && subject.isClone)
   return ""

  const bit = +metadata.get(subject.kind === "part" ? subject.host : subject.owner.host + "/" + subject.key)

  if (isNaN(bit))
   throw error(`the subject had an invalid metadata state (${subject.kind === "part" ? subject.host : subject.owner.host + "/" + subject.key})`)

  return bit
 })
 const bitString = bits.join("")
 _.compressedMetadata = RID.toHash(BigInt("0b" + bitString))
} else {

 // Unpack metadata for runtime use.
 const bitString = RID.fromHash(_.compressedMetadata).toString(2).padStart(allSubjects.length, "0")
 const bits = [...bitString]
 allSubjects.forEach((subject, index) => {

  if (subject.kind === "part" && subject.isClone || subject.kind === "file" && subject.owner.isClone)
   return

  _.metadata.set(subject.kind === "part" ? subject.host : subject.owner.host + "/" + subject.key, bits[index] === "1")
 })
}