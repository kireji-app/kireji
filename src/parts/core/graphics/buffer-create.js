let bufferSize = (TYPED_ARRAY.byteLength + 3) & ~3

if (USAGE == (GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST))
 bufferSize = Math.ceil(bufferSize / 16) * 16

const buffer = Graphics.device.createBuffer({ size: bufferSize, usage: USAGE, mappedAtCreation: true })

new TYPED_ARRAY.constructor(buffer.getMappedRange()).set(TYPED_ARRAY)

buffer.unmap()

return buffer