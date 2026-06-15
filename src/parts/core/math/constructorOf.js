if (typeof NUMBER === "bigint")
 return BigInt

if (typeof NUMBER === "number")
 return Number

throw error(`non-numeric input types are not supported`)

/* If it wasn't just math:

if (INPUT === undefined || INPUT === null)
 throw error("this method is not designed to handle undefined or null inputs")

return {
 number: Number,
 bigint: BigInt,
 boolean: Boolean,
 string: String,
 function: Function,
 symbol: Symbol,
 get object() {
  return typeof INPUT.constructor === "function" ? INPUT.constructor : Object
 }
}[typeof INPUT]

*/