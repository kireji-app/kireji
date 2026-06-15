/*
// 1. Bit-pack the raw 1-byte-per-pixel array into target bit depth rows
const pixelsPerByte = 8 / BIT_DEPTH
const pixelsPerRowByteLength = Math.ceil(WIDTH / pixelsPerByte)
const rowStride = 1 + pixelsPerRowByteLength

const filteredRows = new Uint8Array(HEIGHT * rowStride)
const bitMask = (1 << BIT_DEPTH) - 1

for (let y = 0; y < HEIGHT; y++) {
 const rowStart = y * rowStride
 filteredRows[rowStart] = 0 // Filter type: None

 for (let x = 0; x < WIDTH; x++) {
  const pixelIndex = y * WIDTH + x
  const paletteIndex = PIXEL_INDICES[pixelIndex] & bitMask

  const byteOffsetInRow = Math.floor(x / pixelsPerByte)
  const targetByteIndex = rowStart + 1 + byteOffsetInRow

  const positionInByte = x % pixelsPerByte
  const shift = (pixelsPerByte - 1 - positionInByte) * BIT_DEPTH

  filteredRows[targetByteIndex] |= (paletteIndex << shift)
 }
}

// 2. Extract PLTE and tRNS chunks from 4-channel objects
const plteBytes = []
const trnsBytes = []
let hasTransparency = false

for (const color of PALETTE) {
 plteBytes.push(color.r & 255, color.g & 255, color.b & 255)
 const alpha = color.a !== undefined ? (color.a & 255) : 255
 trnsBytes.push(alpha)

 if (alpha < 255)
  hasTransparency = true
}

if (hasTransparency)
 while (trnsBytes.length > 0 && trnsBytes[trnsBytes.length - 1] === 255)
  trnsBytes.pop()

// 3. Deflate stored blocks (Safe alternative to spread operators for large arrays)
const BLOCK_MAX = 65535
const deflateBlocks = []
for (let offset = 0; offset < filteredRows.length; offset += BLOCK_MAX) {
 const block = filteredRows.slice(offset, offset + BLOCK_MAX)
 const isFinal = offset + BLOCK_MAX >= filteredRows.length ? 1 : 0
 const len = block.length
 const nlen = (~len) & 0xFFFF

 deflateBlocks.push(
  isFinal,
  len & 0xFF, (len >>> 8) & 0xFF,
  nlen & 0xFF, (nlen >>> 8) & 0xFF
 )
 // Push block bytes manually to prevent stack size crashes on large files
 for (let i = 0; i < block.length; i++)
  deflateBlocks.push(block[i])
}

// 4. Zlib wrapper around the deflate blocks
const idatData = [0x78, 0x01, ...deflateBlocks, ...FileUtils.uint32BE(FileUtils.adler32(filteredRows))]

// 5. Assemble final PNG Structure
const pngBytes = new Uint8Array([
 137, 80, 78, 71, 13, 10, 26, 10, // Signature
 ...PNG.makeChunk('IHDR', [...FileUtils.uint32BE(WIDTH), ...FileUtils.uint32BE(HEIGHT), BIT_DEPTH, 3, 0, 0, 0]),
 ...PNG.makeChunk('PLTE', plteBytes),
 ...(hasTransparency ? PNG.makeChunk('tRNS', trnsBytes) : []),
 ...PNG.makeChunk('IDAT', idatData),
 ...PNG.makeChunk('IEND', [])
])

// 6. Base64 data URI output
let binary = []
for (let i = 0; i < pngBytes.length; i += 1024)
 binary.push(String.fromCharCode(...pngBytes.subarray(i, i + 1024)))

return btoa(binary.join(""))
*/

// ── Filtered rows (filter type 0: None) ──────────────────────────────────
const rowStride = WIDTH + 1  // 1 filter byte + WIDTH index bytes
const filteredRows = new Uint8Array(HEIGHT * rowStride)
for (let y = 0; y < HEIGHT; y++) {
 filteredRows[y * rowStride] = 0  // filter type: None
 for (let x = 0; x < WIDTH; x++)
  filteredRows[y * rowStride + 1 + x] = PIXEL_INDICES[y * WIDTH + x]
}

// ── Deflate stored blocks ─────────────────────────────────────────────────
// No compression — just wrap raw bytes in valid deflate block headers
const BLOCK_MAX = 65535
const deflateBlocks = []
for (let offset = 0; offset < filteredRows.length; offset += BLOCK_MAX) {
 const block = filteredRows.slice(offset, offset + BLOCK_MAX)
 const isFinal = offset + BLOCK_MAX >= filteredRows.length ? 1 : 0
 const len = block.length
 const nlen = (~len) & 0xFFFF
 deflateBlocks.push(
  isFinal,
  len & 0xFF, (len >>> 8) & 0xFF,
  nlen & 0xFF, (nlen >>> 8) & 0xFF,
  ...block
 )
}

// ── Zlib wrapper ──────────────────────────────────────────────────────────
// CMF=0x78 (deflate, 32K window), FLG=0x01 — (0x78 * 256 + 0x01) % 31 === 0
const idatData = [0x78, 0x01, ...deflateBlocks, ...FileUtils.uint32BE(FileUtils.adler32(filteredRows))]

// ── PNG ───────────────────────────────────────────────────────────────────
const pngBytes = new Uint8Array([
 // Signature
 137, 80, 78, 71, 13, 10, 26, 10,
 // IHDR: dimensions, 8-bit depth, color type 3 (indexed)
 ...PNG.makeChunk('IHDR', [...FileUtils.uint32BE(WIDTH), ...FileUtils.uint32BE(HEIGHT), 8, 3, 0, 0, 0]),
 // PLTE: RGB triplets
 ...PNG.makeChunk('PLTE', PALETTE.flat()),
 // tRNS: palette index 0 is fully transparent
 ...PNG.makeChunk('tRNS', [0x00]),
 // IDAT: zlib-wrapped deflate pixel data
 ...PNG.makeChunk('IDAT', idatData),
 // IEND: empty terminator
 ...PNG.makeChunk('IEND', [])
])

// ── Base64 data URI ───────────────────────────────────────────────────────
// Chunked to avoid call stack limits on large images
let binary = ''
for (let i = 0; i < pngBytes.length; i += 1024)
 binary += String.fromCharCode(...pngBytes.subarray(i, i + 1024))

return btoa(binary)