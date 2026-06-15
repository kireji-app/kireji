declare interface IFileUtils
 extends IMix<ICore, IPartAny> {

 // Subparts.
 readonly png: IPNG

 // Components.
 /** The Adler-32 algorithm creates a 32-bit checksum (by concatenating two 16-bit checksums). It is faster than CRC32 but weaker for short data streams. */
 readonly adler32(BYTES: Uint8Array): number
 /** The CRC32 (Cyclic Redundancy Check 32) algorithm creates a 32-bit checksum of a given array of bytes. It is stronger than Adler32 for short messages. */
 readonly crc32(BYTES: Uint8Array): number
 /** Serializes a single, large (32 bit) unsigned integer into a big-endian array of four unsigned 1-byte integers. */
 readonly uint32BE(N: number): number
 /** Performs an `atob`-stype operation on a base64 encoded string but returns an ArrayBuffer instead of a binary string. */
 readonly atoBuffer(base64: string): ArrayBuffer

 // Properties.
 /** A pre-built table used by the CRC32 checksum algorithm. */
 readonly crcTable: Uint32Array
 /** A unicode-safe replacement for `btoa` that turns text strings into UTF-8 base64. */
 readonly utf8ToBase64: typeof SourceMappedFile.utf8ToBase64
}

/** A collection of utilities for creating and parsing files. */
declare const FileUtils: IFileUtils
type FileUtils = T