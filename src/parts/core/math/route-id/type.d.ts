
declare interface IRID
 extends IPart<IMath, null> {

 // Components.
 /** The alphabet of symbols used to encode BigInt RID values as URI-safe base64 strings. */
 readonly "radix": string
 /** Trades a versioned string pathname for the BigInt RID. */
 readonly fromPath(INPUT_PATH: string): bigint
 /** Trades a base64-encoded string segment for a BigInt RID. */
 readonly fromHash(INPUT_HASH: string): bigint
 /** Trades a BigInt RID for a versioned string pathname. */
 readonly toPath(INPUT_RID: bigint): string
 /** Trades a BigInt RID for a string segment. */
 readonly toHash(INPUT_RID: bigint): string
 /** Produces a cryptographically random RID (BigInt) between 0 and one less than the given cardinality. */
 readonly random(CARDINALITY: bigint): bigint
 /** Returns a number or, if `SHOW_UNIT` is true, a string representing the number of charms (base64 characters) needed to encode an RID less than or equal to the given cardinality. */
 readonly toCharms(CARDINALITY, SHOW_UNIT = true)
 /** Returns a number or, if `SHOW_UNIT` is true, a string representing the number of bits needed to encode an RID less than or equal to the given cardinality. */
 readonly toBits(CARDINALITY, SHOW_UNIT = true)
 /** Returns a string representing the given BigInt `CARDINALITY` in scientific notation (a coefficient times 10 to some power). When `AS_HTML` is true, the power will be wrapped in a superscript tag. Otherwise, it will use unicode superscript characters. */
 readonly toScientific(CARDINALITY: bigint, AS_HTML: boolean = false): string
}

/** A collection of utilities for handing BigInt route identifiers (RIDs). */
declare const RID: IRID
type RID = T