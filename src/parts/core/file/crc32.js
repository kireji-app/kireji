let crc = 0xFFFFFFFF

for (const byte of BYTES)
 crc = FileUtils.crcTable[(crc ^ byte) & 0xFF] ^ (crc >>> 8)

return (crc ^ 0xFFFFFFFF) >>> 0