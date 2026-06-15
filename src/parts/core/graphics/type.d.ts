interface IGraphics
 extends IFacet<ICore> {

 // Properties.
 readonly adapter: GPUAdapter
 readonly device: GPUDevice

 // Components.
 /** Creates and maps a new buffer on the GPU with the given array contents. */
 readonly createBuffer(TYPED_ARRAY: ArrayBuffer, USAGE: GPUBufferUsageFlags): GPUBuffer
}

declare const Graphics: IGraphics
type Graphics = T