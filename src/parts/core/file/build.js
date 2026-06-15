define(FileUtils, {
 crcTable: {
  resolve() {

   const crcTable = new Uint32Array(256)

   for (let i = 0; i < 256; i++) {

    let c = i

    for (let j = 0; j < 8; j++)
     c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1

    crcTable[i] = c
   }

   return crcTable
  }
 },
 utf8ToBase64: { value: SourceMappedFile.utf8ToBase64 }
})