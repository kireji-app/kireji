let size = (TYPED_ARRAY.byteLength + 3) & ~3

if (USAGE == (GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST))
 size = Math.ceil(size / 16) * 16

const buffer = gpu.device.createBuffer({ size, usage: USAGE, mappedAtCreation: true })

new TYPED_ARRAY.constructor(buffer.getMappedRange()).set(TYPED_ARRAY)

buffer.unmap()

return buffer