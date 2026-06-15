const typeBytes = [...TYPE].map(c => c.charCodeAt(0))

const typeAndData = [...typeBytes, ...DATA]

return [...FileUtils.uint32BE(DATA.length), ...typeAndData, ...FileUtils.uint32BE(FileUtils.crc32(typeAndData))]