if (environment === "node-main") {

 // Pack metadata for transport.
 const bits = allSubjects.map(([host, fn]) => +metadata.get(host + (fn ? "/" + fn : "")))
 const bitString = bits.join("")
 _.compressedMetadata = RID.toHash(BigInt("0b" + bitString))
} else {

 // Unpack metadata for runtime use.
 const bitString = RID.fromHash(_.compressedMetadata).toString(2).padStart(allSubjects.length, "0")
 const bits = [...bitString]
 allSubjects.forEach(([host, fn], index) => _.metadata.set(host + (fn ? "/" + fn : ""), bits[index] === "1"))
}