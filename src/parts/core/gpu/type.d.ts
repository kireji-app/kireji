interface IGpu
 extends IFacet<ICore> {

 // Runtime Properties.
 readonly adapter: GPUAdapter
 readonly device: GPUDevice

 // Serialized Properties.
 /** Creates and maps a new buffer on the GPU with the given array contents. */
 readonly createBuffer(TYPED_ARRAY: ArrayBuffer, USAGE: GPUBufferUsageFlags): GPUBuffer
}

declare const gpu: IGpu