const adapter = await navigator.gpu.requestAdapter()
const device = await adapter.requestDevice()

define(Graphics, {
 adapter: { value: adapter },
 device: { value: device }
})