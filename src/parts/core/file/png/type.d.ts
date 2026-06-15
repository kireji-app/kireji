declare interface IPNG
 extends IPart<IMath, null> {

 // Components
 /** Prepares a single chunk of the PNG file's data. */
 readonly makeChunk(TYPE: string, DATA: Uint8Array): Uint8Array
 /** Creates a PNG file from the given data. */
 readonly encode(WIDTH: number, HEIGHT: number, PIXEL_INDICES: Uint8Array, PALETTE: RGBAColor[], BIT_DEPTH: 1 | 2 | 4 | 8 = 8): string
}

declare const PNG: IPNG
type PNG = T