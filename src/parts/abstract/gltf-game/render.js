// Submit render pass(es) to GPU.
const { width, height } = thisGLTFGame.onscreenContext.canvas
const encoder = Graphics.device.createCommandEncoder()
const pass = encoder.beginRenderPass({
 colorAttachments: [{
  view: thisGLTFGame.offscreenContext.getCurrentTexture().createView(),
  clearValue: { r: 0, g: 0, b: 0, a: 0 },
  loadOp: 'clear',
  storeOp: 'store'
 }],
 depthStencilAttachment: {
  view: Graphics.device.createTexture({
   size: [width, height, 1],
   dimension: '2d',
   format: 'depth24plus-stencil8',
   usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC
  }).createView(),
  depthClearValue: 1,
  depthLoadOp: 'clear',
  depthStoreOp: 'store',
  stencilClearValue: 0,
  stencilLoadOp: 'clear',
  stencilStoreOp: 'store'
 }
})
pass.setViewport(0, 0, width, height, 0, 1)
pass.setScissorRect(0, 0, width, height)
for (const renderPassDefinition of thisGLTFGame.renderPassDefinitions) {
 pass.setPipeline(renderPassDefinition.pipeline)
 pass.setBindGroup(0, renderPassDefinition.bindGroup)
 pass.setIndexBuffer(renderPassDefinition.indexBuffer, renderPassDefinition.indexArray instanceof Uint32Array ? 'uint32' : 'uint16')
 renderPassDefinition.vertexBuffers.forEach((buffer, index) => pass.setVertexBuffer(index, buffer))
 pass.drawIndexed(renderPassDefinition.indexCount)
}
pass.end()
Graphics.device.queue.submit([encoder.finish()])

// Draw to canvas.
thisGLTFGame.onscreenContext.clearRect(0, 0, width, height)
thisGLTFGame.onscreenContext.drawImage(thisGLTFGame.offscreenContext.canvas, 0, 0)