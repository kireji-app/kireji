#!/usr/bin/env node

/** @type {(_: IEcosystem) => void} */
function ƒ(_) {
 class RID {
  static radix = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_0"
  static toHash(rid) {
   if (typeof rid !== "bigint")
    throw new RangeError(`Segment encoder can only encode a bigint type (got ${typeof rid})`)
   if (rid < 0n)
    throw new RangeError("Segment encoder can't encode a negative RID.")
   let charmCount = 0n
   let charmIndex
   let reducedRID = rid
   while (reducedRID > 0n) {
    charmIndex = 2n ** (charmCount * 6n)
    if (reducedRID >= charmIndex) {
     reducedRID -= charmIndex
     charmCount++
    } else break
   }
   let charmLengthOffset = 0n
   for (let i = 0n; i < charmCount; i++)
    charmLengthOffset += 2n ** (i * 6n)
   const binaryString = (rid - charmLengthOffset).toString(2)
   const charmRoundedBinaryLength = Number(charmCount) * 6
   const charmRoundedBinaryString = binaryString.padStart(charmRoundedBinaryLength, "0")
   let hash = ""
   for (let i = 0; i < charmRoundedBinaryLength; i += 6)
    hash += this.radix[parseInt(charmRoundedBinaryString.slice(i, i + 6), 2)]
   return hash
  }
  static fromHash(hash) {
   let charmRoundedBinaryString = "0b0"
   let charmLengthOffsetBinaryString = "0b0"
   for (const character of [...hash]) {
    const characterValue = RID.radix.indexOf(character)
    if (characterValue === -1 || characterValue >= 64)
     throw `Bad Hash Character: ${character}`
    charmRoundedBinaryString += characterValue.toString(2).padStart(6, 0)
    charmLengthOffsetBinaryString += "000001"
   }
   return BigInt(charmRoundedBinaryString) + BigInt(charmLengthOffsetBinaryString)
  }
  static toPath(rid) {
   return `/${_.version}/${RID.toHash(rid)}/`
  }
  static fromPath(pathname) {
   if (!pathname.endsWith("/"))
    throw `Pathname missing trailing slash: ${pathname}`
   const segments = pathname.split("/")
   if (segments.length > 4)
    throw `Pathname has too many segments`
   else if (segments.length < 4)
    throw `Pathname has too few segments`
   return RID.fromHash(segments[2])
  }
  static random(cardinality) {
   if (typeof cardinality !== "bigint" || cardinality < 0n)
    throw new RangeError("Random BigInt error: Cardinality must be a bigint greater than 0.")
   if (cardinality === 1n)
    return 0n
   const bitCount = toBits(cardinality, false)
   const byteCount = Math.ceil(bitCount / 8)
   const bytes = new Uint8Array(byteCount)
   const finalByteMask = (1 << (bitCount % 8 || 8)) - 1
   while (true) {
    crypto.getRandomValues(bytes)
    bytes[byteCount - 1] &= finalByteMask
    let value = 0n
    for (const b of bytes)
     value = (value << 8n) | BigInt(b)
    if (value < cardinality)
     return value
   }
  }
 }
 class Vector {
  static 2(x = 0, y = 0) {
   return { x, y }
  }
  static 3(x = 0, y = 0, z = 0) {
   return { x, y, z }
  }
  static magnitude(vector) {
   return Math.hypot(...Object.values(vector))
  }
  static normalize(vector) {
   const result = { ...vector }
   const magnitude = this.magnitude(vector)
   if (magnitude)
    for (const dimension in vector)
     result[dimension] = vector[dimension] / magnitude
   return result
  }
  static sign(vector) {
   const result = {}
   for (const dimension in vector)
    result[dimension] = Math.sign(vector[dimension])
   return result
  }
  static floor(vector) {
   const result = {}
   for (const dimension in vector)
    result[dimension] = Math.floor(vector[dimension])
   return result
  }
  static round(vector) {
   const result = {}
   for (const dimension in vector)
    result[dimension] = Math.round(vector[dimension])
   return result
  }
  static operate(value1, value2, operation) {
   if (typeof value1 === "number" || typeof value2 === "number") {
    if (typeof value1 === "number" && typeof value2 === "number")
     return operation(value1, value2)
    const result = {}
    const number = typeof value1 === "number" ? value1 : value2
    const vector = typeof value1 === "object" ? value1 : value2
    for (const dimension in vector)
     result[dimension] = operation(vector[dimension], number)
    return result
   }
   const result = {}
   const dimensions = Object.keys(value1)
   if (dimensions.some(key => !(key in value2)) || Object.keys(value2).some(key => !(key in value1)))
    throw new Error(`Vector Operation Error: the two vectors do not have the same keys.`)
   for (const dimension of dimensions)
    result[dimension] = operation(value1[dimension], value2[dimension])
   return result
  }
  static add(value1, value2) {
   return this.operate(value1, value2, (a, b) => a + b)
  }
  static subtract(value1, value2) {
   return this.operate(value1, value2, (a, b) => a - b)
  }
  static multiply(value1, value2) {
   return this.operate(value1, value2, (a, b) => a * b)
  }
  static dot(vector1, vector2) {
   let result = 0
   const dimensions = Object.keys(vector1)
   if (dimensions.some(key => !(key in vector2)) || Object.keys(vector2).some(key => !(key in vector1)))
    throw new Error(`Vector Dot Product Error: the two vectors do not have the same keys.`)
   for (const dimension of dimensions)
    result += vector1[dimension] * vector2[dimension]
   return result
  }
 }
 class FenwickTree {
  static LSB = []
  constructor(size) {
   const oldSize = BigInt(FenwickTree.LSB.length)
   for (let newSize = oldSize + 1n; newSize <= size; newSize++)
    FenwickTree.LSB[newSize - 1n] = newSize & -newSize
   this.size = size
   this.tree = FenwickTree.LSB.slice(0, Number(size))
   this.powerFloor = 2n ** BigInt(size.toString(2).length - 1)
  }
  update(i, val) {
   for (; i < this.size; i += FenwickTree.LSB[i])
    this.tree[i] += val
  }
  query(i) {
   let sum = 0n
   for (; i >= 0n; i -= FenwickTree.LSB[i])
    sum += this.tree[i]
   return sum
  }
  findNthAvailable(n) {
   let nthAvailable = 0n
   for (let p = this.powerFloor; p > 0n; p /= 2n) {
    const i = nthAvailable + p
    if (i <= this.size && this.tree[i - 1n] <= n) {
     n -= this.tree[i - 1n]
     nthAvailable = i
    }
   }
   return nthAvailable
  }
 }
 class SourceMappedFile {
  sources = []
  commands = []
  copyFrom(copySourceDefinition) {
   copySourceDefinition.part ??= _
   copySourceDefinition.filename ??= "build.js"
   this.commands.push(copySourceDefinition)
  }
  packAndMap() {
   const sources = []
   const mappings = []
   const outputLines = []
   const sourcesMarks = []
   const sourcesLines = []
   const sourceIndices = {}
   const sourcesContent = []
   for (const { part, filename, literal, ln, indent = 0 } of this.commands) {
    const writeLineCommands = []
    if (!part || typeof part !== "object" || !part.domains)
     throw `missing or invalid "part" property on copyFrom command`
    if (typeof filename !== "string" || filename.length === 0)
     throw `invalid "filename" property on copyFrom command (copying from ${part.host})`
    const source = [filename, ...part.domains, _.version, ""].reverse().join("/")
    if (!Object.hasOwn(part, filename) && !(part === _ && filename === "build.js"))
     throw `${source} doesn't exist`
    const sourceIndex = sourceIndices[source] ??= (sources.push(source) - 1)
    const sourceContent = sourcesContent[sourceIndex] ??= ((part === _ && filename === "build.js") ? ƒ.toString() : part[filename])
    const sourceLines = sourcesLines[sourceIndex] ??= sourceContent.split("\n")
    if (typeof literal === "string") {
     const tokenize = false
     // Copy the given literal string from the file where the literal was created.
     const sourceMarks = sourcesMarks[sourceIndex] ??= sourceLines.reduce((marks, sourceLine, ln) => {
      for (const { 0: mark, index: col } of sourceLine.matchAll(/@[a-z-]+@/g)) {
       if (mark in marks)
        throw `duplicate source position mark ${mark} in ${source}`
       marks[mark] = { ln, col }
      }
      return marks
     }, {})
     const sourceMark = literal.match(/^@[a-z-]+@/g)?.[0]
     if (!sourceMark)
      throw `source-mapped literal string must include a unique source mark to identify its position within ${source}`
     if (!(sourceMark in sourceMarks))
      throw `source mark ${sourceMark} was not found in ${source} - source must be the file where the given literal was constructed and mark must exist in said file as a single contiguous string`
     const literalLines = literal.slice(sourceMark.length).split("\n")
     const { ln, col } = sourceMarks[sourceMark]
     for (const sourceLine of literalLines)
      writeLineCommands.push({ sourceLine, ln, col: col + sourceMark.length, indent, tokenize })
    } else {
     const col = 0
     const tokenize = true
     if (typeof ln === "number") {
      const sourceLine = sourceLines[ln]
      // Copy the given line from the source file.
      writeLineCommands.push({ sourceLine, ln, col, indent, tokenize })
     } else {
      // Copy the entire file from the source file into the destination.
      for (let ln = 0; ln < sourceLines.length; ln++) {
       const sourceLine = sourceLines[ln]
       writeLineCommands.push({ sourceLine, ln, col, indent, tokenize })
      }
     }
    }
    for (const { sourceLine, ln, col, indent, tokenize } of writeLineCommands) {
     outputLines.push("".padEnd(indent) + sourceLine)
     if (_.mapping === "enabled") mappings.push(
      (sourceLine && tokenize) ?
       [...sourceLine.matchAll(/\w+|\s+|\W+/g)].map(({ index }) => [
        indent + index,
        sourceIndex,
        ln,
        col + index
       ]) : [[
        indent,
        sourceIndex,
        ln,
        col
       ]]
     )
    }
   }
   const radix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
   const outputContent = outputLines.join("\n")
   if (_.mapping !== "enabled")
    return outputContent
   const encoderAbsolutePosition = [0, 0, 0, 0, 0]
   return outputContent + `
//${"#"} sourceMappingURL=data:application/json;charset=utf-8;base64,${btoaUnicode(serialize({
    version: 3,
    sourceFile: "sourceFile.js",
    sourceRoot: "",
    sources,
    names: [],
    sourcesContent,
    mappings: mappings.map(decodedLine => (
     (encoderAbsolutePosition[0] = 0),
     decodedLine
      .map(decodedSegment => {
       return decodedSegment
        .map((absoluteDecodedPlace, i) => {
         const signedRelativeDecodedPlace = absoluteDecodedPlace - encoderAbsolutePosition[i]
         encoderAbsolutePosition[i] = absoluteDecodedPlace
         if (signedRelativeDecodedPlace === 0) return "A"
         let unsignedRelativeDecodedPlace = Math.abs(signedRelativeDecodedPlace),
          encodedSegment = ""
         while (unsignedRelativeDecodedPlace > 0) {
          let characterIndex
          if (!encodedSegment) {
           characterIndex = (unsignedRelativeDecodedPlace & 15) * 2 + +!Object.is(signedRelativeDecodedPlace, unsignedRelativeDecodedPlace)
           unsignedRelativeDecodedPlace >>>= 4
          } else {
           characterIndex = unsignedRelativeDecodedPlace & 31
           unsignedRelativeDecodedPlace >>>= 5
          }
          if (unsignedRelativeDecodedPlace > 0) characterIndex |= 32
          encodedSegment += radix[characterIndex]
         }
         return encodedSegment
        })
        .join("")
      }).join(",")
    )).join(";"),
   }, null, 1))}`
  }
 }
 function log(verbosity, ...data) {
  logAny(verbosity, data, "log")
 }
 function warn(...data) {
  logAny(0, data, "warn")
 }
 function debug(...data) {
  logAny(0, data, "debug")
 }
 function logAny(verbosity, data, method) {
  (["error", "warn"].includes(method) || _.command !== "build") && verbosity <= _.verbosity && console[method](...(environment === "offline-server" ? ["offline-server:", ...data] : data))
 }
 function logError(...data) {
  logAny(0, data, "error")
 }
 function logScope(verbosity, label, callback) {
  logAny(verbosity, [label], "group")
  const output = callback?.((...data) => logAny(verbosity, data, "log"))
  logAny(verbosity, [], "groupEnd")
  return output
 }
 function logEntropy(verbosity, ...parts) {
  if (verbosity > _.verbosity) return
  logAny(verbosity, [
   parts.reduce((table, part) => (table[part.path] = {
    "Entropy": toCharms(part.cardinality),
    "Cardinality": scientific(part.cardinality)
   }, table), {})
  ], "table")
 }
 function logStringSize(verbosity, string) {
  if (verbosity > _.verbosity) return
  string = string.toString()
  const n = new TextEncoder().encode(string).length
  logAny(verbosity, [{
   Mebibytes: { Quantity: n / 2 ** 20, Radix: '2²⁰', "Abbr.": 'MiB', Format: 'UTF-8' },
   Megabytes: { Quantity: n / 10 ** 6, Radix: '10⁶', "Abbr.": 'MB', Format: 'UTF-8' },
   Kibibytes: { Quantity: n / 2 ** 10, Radix: '2¹⁰', "Abbr.": 'KiB', Format: 'UTF-8' },
   Kilobytes: { Quantity: n / 10 ** 3, Radix: '10³', "Abbr.": 'KB', Format: 'UTF-8' },
   "Unicode code points": { Quantity: [...string].length, "Abbr.": 'UCP', Format: 'UTF-32' },
   "ECMA-262 string indices": { Quantity: string.length, "Abbr.": 'chars', Format: 'UTF-16' },
   "Bytes": { Quantity: n, Radix: '2⁸', "Abbr.": 'B', Format: 'UTF-8' },
   "Charms  (base-64 length)": { Quantity: Math.ceil((n * 8) / 6), Radix: '2⁶', "Abbr.": 'chm', Format: 'UTF-8' },
   "Bits": { Quantity: Math.ceil(n * 8), Radix: '2¹', "Abbr.": 'b', Format: 'UTF-8' },
  }], "table")
 }
 function logServerScope(col1, col2, col3, callback) {
  return logScope(0, `\n${("" + col1).padEnd(22, " ")} ${(environment.startsWith("node") ? Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB" : "--").padEnd(8, " ")} ${("" + col2).padStart(24, " ")} ${col3}`, log => callback((col1, col2, col3) => log(`${("" + col1).padEnd(20, " ")} ${(environment.startsWith("node") ? Math.trunc(process.memoryUsage().rss / 1024 / 1024) + " MiB" : "--").padEnd(8, " ")} ${("" + col2).padStart(24, " ")} ${col3}`)))
 }
 function toBits(cardinality, unit = true) {
  cardinality = BigInt(cardinality) - 1n
  return (cardinality ? cardinality.toString(2).length : 0) + (unit ? " bit" + (cardinality !== 1 ? "s" : "") : 0)
 }
 function toCharms(cardinality, unit = true) {
  return RID.toHash(BigInt(cardinality) - 1n).length + (unit ? " charm" + (cardinality !== 1 ? "s" : "") : 0)
 }
 function atoBuffer(base64) {
  return (Uint8Array.fromBase64?.(base64) ?? ([...base64 = atob(base64)].reduce((A, c, i) => (A[i] = c.charCodeAt(0), A), new Uint8Array(base64.length)))).buffer
 }
 function camelCase(words, delimiter = "-") {
  return (typeof words === "string" ? words.split(delimiter) : words).map((word, i) => (i ? word[0].toUpperCase() + word.slice(1) : word)).join("")
 }
 function titleCase(words, delimiter = "-") {
  return (typeof words === "string" ? words.split(delimiter) : words).map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
 }
 function serialize(value) {
  return JSON.stringify(value, (k, v) => (typeof v === "bigint" ? v.toString() + "n" : v), 1)
 }
 function scientific(x, html = false) {
  x = x.toString(10)
  const log10 = x.length - 1
  x = Math.round((x[0] ?? 0) + (x[1] ?? 0) + (x[2] ?? 0) + (x[3] ?? "0") + "." + (x[4] ?? "0")).toString()
  const factor = `${x.slice(0, 1)}.${x.slice(1)}`
  return html ? `<math><mn>${factor}</mn><mo>&sdot;</mo><msup><mn>10</mn><mn>${log10}</mn></msup></math>` : `${factor} × 10` + [...log10.toString()].map(n => '⁰¹²³⁴⁵⁶⁷⁸⁹'[n]).join("")
 }
 function btoaUnicode(text) {
  return btoa(new TextEncoder("utf-8").encode(text).reduce((data, byte) => data + String.fromCharCode(byte), ""))
 }
 function sanitizeAttr(string) {
  return string.replaceAll(/&/g, '&amp;').replaceAll(/"/g, '&quot;').replaceAll(/'/g, '&#39;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;')
 }
 /** @type {(part: IPartAny, definition: IRuntimePropertyDefinitions<IPartAny>) => IPartAny} */
 function define(part, descriptorMap) {
  // Resolve late-bound properties in the order they were added to the descriptor map.
  for (const propertyKey of Reflect.ownKeys(descriptorMap)) {
   const propertyDescriptor = descriptorMap[propertyKey]
   if (typeof propertyDescriptor !== "object")
    throw new TypeError(`Part Define Error: property definition for "${propertyKey}" on part ${part.host} must be an object, not a primitive value (got ${typeof propertyDescriptor}).`)
   if ("resolve" in propertyDescriptor) {
    propertyDescriptor.value = propertyDescriptor.resolve.call(part)
    delete propertyDescriptor.resolve
   }
   Object.defineProperty(part, propertyKey, propertyDescriptor)
  }
 }
 // Initialization
 const environment = (() => {

  if (globalThis.constructor === globalThis.Window)
   return "client"

  if (globalThis.constructor === globalThis.ServiceWorkerGlobalScope)
   return "offline-server"

  define(_, {
   command: {
    // The `process` object (and this argument) is the same across `require.main` and imported modules.
    value: process.argv[2] || "help", enumerable: true
   }
  })

  if (require.main === module) {

   function exec(cmd) {
    return require("child_process").execSync(cmd).toString().trim()
   }

   define(_, {
    name: {
     value: __dirname.split(/[\\/]/).filter(Boolean).at(-4),
     enumerable: true
    },
    branch: {
     value: exec("git rev-parse --abbrev-ref HEAD"),
     enumerable: true
    },
    gitSHA: {
     value: exec("git rev-parse HEAD"),
     enumerable: true
    },
    version: {
     value: (([M, m, p], c) => _.command === "debug" ? +M && c === "major" ? `${++M}.0.0` : c === "minor" || (!+M && c === "major") ? `${M}.${++m}.0` : `${M}.${m}.${++p}` : `${M}.${m}.${p}`)(exec("git log -1 --pretty=%s").toString().match(/^\s*(\d+\.\d+\.\d+)/)[1].split("."), _.change),
     enumerable: true
    },
    modified: {
     value: exec('git show -s --format=%ct HEAD'),
     enumerable: true
    },
    ETag: {
     resolve() {
      return `"${_.version}.${_.gitSHA.slice(0, 7)}${_.command === "debug" ? ("." + Math.random()).slice(2, 10) : ""}"`
     },
     enumerable: true
    }
   })

   return "node-main"
  }

  return "node-module"
 })()
 define(_, {
  "..": {
   value: null
  },
  domains: {
   value: []
  },
  openTask: {
   value: null,
   writable: true
  },
  metadata: {
   value: metadata = new Map()
  },
  welcomeMessage: {
   resolve() {
    return `
     ▌ ▘     ▘▘ ${_.name}
 k = ▙▘▌▛▘█▌ ▌▌ ${_.branch}
     ▛▖▌▌ ▙▖ ▌▌ ${_.version}
            ▙▌  `.slice(1)
   }
  }
 })
 logScope(0, `\n${_.welcomeMessage}${environment}`, bootLog => {
  switch (_.command) {
   case "debug":
   case "build":
    break
   case "init":
   case "example":
    logError("Not implemented yet.")
    process.exit(1)
    return
   case "version":
    bootLog(`Version:\n - kireji: ${require('../package.json').version}\n - ${_.name}: ${_.version}\n`)
    process.exit(0)
    return
   default:
    logError(`Unknown argument: ${_.command}\n`)
   case "help":
    bootLog(`Commands:
 init    Initializes an empty project.
 example Initializes the example project.
 debug   Builds a local server.
 build   Builds a production server.
`)
    process.exit(+(_.command === "help"))
    return
  }
  bootLog(`
 ╭┈┈┈┈┈┈┈┈┈┈┈ BOOT BEGINNING ┈┈┈┈┈┈┈┈┈┈┈╮
 ┊ Now booting the Kireji Web Framework ┊
 ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯`
  )
  if (environment === "node-main") {
   // Merge and pack the source code directory structure.
   _.compressedMetadata = ""
   _.metadata.set("", true)
   const stats = { fileCount: 0, partCount: 0, ignoreCount: 0 }
   const { readdirSync: readFolder, readFileSync: readFile, existsSync: exists } = require("fs")
   const { resolve } = require("path")
   logScope(1, "Merging Configurations", configLog => {
    for (const key in _) {
     const value = _[key]
     if (typeof value !== "string")
      throw new TypeError(`Internal Error: found framework default config parameter that was not a string (typeof "${key}" === ${typeof value}).`)
     if (key.includes("."))
      throw new TypeError(`Internal Error: found framework default config parameter that is named like a file ("${key}"). Config parameters are not files.`)
     _.metadata.set("/" + key, false)
    }
    const projectConfigPath = resolve(__dirname, "../../../src/kireji.json")
    if (exists(projectConfigPath)) {
     const projectConfig = require(projectConfigPath)
     for (const key in projectConfig) {
      const value = projectConfig[key]
      if (typeof value !== "string")
       throw new TypeError(`All config values in kireji.json must be strings (found typeof "${key}" === ${typeof value}).`)
      if (key.includes("."))
       throw new TypeError(`Config values in kireji.json should not represent files or have file extensions (found "${key}").`)
      _[key] = value
      _.metadata.set("/" + key, true)
     }
    }
    configLog("Done.")
   })
   logScope(1, "Archiving Repository", archiveLog => {
    let lastLogFlush = Date.now()
    const
     batchedLogs = [],
     bufferLog = (verbosity, msg) => {
      if (verbosity > _.verbosity)
       return
      batchedLogs.push(msg)
      const now = Date.now()
      if (now - lastLogFlush > 17 && batchedLogs.length) {
       archiveLog(batchedLogs.join("\n"))
       batchedLogs.length = 0
       lastLogFlush = now
      }
     },
     frameworkRoot = __dirname,
     projectRoot = resolve(__dirname, "../../../src"),
     readRecursive = domains => {
      const host = [...domains].reverse().join(".")
      if (host.length > 253)
       throw SyntaxError(`Part host would be ${host.length} characters long, exceeding the maximum host name length of 253 (${host}).`)
      const mergedSubjects = new Map()
      const frameworkPath = resolve(frameworkRoot, ...domains)
      if (exists(frameworkPath))
       for (const subject of readFolder(frameworkPath, { withFileTypes: true }).sort()) {
        if (subject.name.endsWith("_.js") && mergedSubjects.has(subject.name.slice(0, -4)) && !(subject.name === "build.js_.js" && host === ""))
         throw new Error(`Internal Error: the framework contains both a dynamic and static version of the same file ("${subject.name}", "${subject.name.slice(0, -4)}").`)
        mergedSubjects.set(subject.name, { subject, path: frameworkPath })
       }
      const projectPath = resolve(projectRoot, ...domains)
      if (exists(projectPath))
       for (const subject of readFolder(projectPath, { withFileTypes: true })) {
        if (subject.name.endsWith("_.js")) {
         // User can't define both a static and dynamic version of the same file.
         if (mergedSubjects.has(subject.name.slice(0, -4)) && mergedSubjects.get(subject.name.slice(0, -4)).path === projectPath)
          throw new Error(`Can't resolve conflict when both a dynamic and static version of the same file exist ("${subject.name}", "${subject.name.slice(0, -4)}").`)
         // User-defined dynamic file replaces framework static file.
         mergedSubjects.delete(subject.name.slice(0, -4))
        } else {
         // User-defined static file replaces framework dynamic file.
         mergedSubjects.delete(subject.name + "_.js")
        }
        mergedSubjects.set(subject.name, { subject, path: projectPath })
       }
      const part = domains.length ? {} : _
      for (const [itemName, { subject, path }] of mergedSubjects)
       if (itemName.startsWith(".") || itemName === "Icon" || (!host && itemName === "build.js") || itemName.endsWith(".ts") || itemName.startsWith("schema.")) {
        stats.ignoreCount++
        bufferLog(4, "".padEnd(domains.length, " ") + `⬚ ${itemName.padEnd(20, " ")} - ignored`)
       } else if (subject.isDirectory()) {
        stats.partCount++
        bufferLog(2, "".padEnd(domains.length, "  ") + `▼ ${itemName}/`)
        _.metadata.set(itemName + (host ? "." + host : ""), path === projectPath)
        part[itemName] = readRecursive([...domains, itemName])
       } else if (subject.isFile()) {
        stats.fileCount++
        const isBinary = itemName.endsWith(".png") || itemName.endsWith(".gif") || itemName.endsWith(".bin")
        bufferLog(3, "".padEnd(domains.length, " ") + `${isBinary ? "▣" : "≡"} ${itemName}`)
        _.metadata.set(host + "/" + itemName, path === projectPath)
        part[itemName] = readFile(resolve(path, itemName), isBinary ? "base64" : "utf-8")
       } else {
        stats.ignoreCount++
        bufferLog(4, "".padEnd(domains.length, " ") + `⬚ ${itemName.padEnd(20, " ")} - ignored (exotic type)`)
       }
      return part
     }
    readRecursive([])
    if (batchedLogs.length)
     archiveLog(batchedLogs.join("\n") + "\n")
   })
   logScope(2, "\nDomain Stats", () => {
    logAny(2, [{
     Parts: { Amount: stats.partCount },
     Files: { Amount: stats.fileCount },
     Ignored: { Amount: stats.ignoreCount }
    }], "table")
   })
  }
  logScope(1, "\nConfiguring Archive Content", () => {
   const landingModel = JSON.parse(_["landing-model.json"])
   let desktopFeatures = 3
   if (_.includeColor === "none") {
    delete _.parts.desktop.color
    delete landingModel.parts.desktop.color
    desktopFeatures--
   } else if (_.includeColor === "dark" || (_.includeColor === "debug-light" && _.command !== "debug")) {
    delete _.parts.desktop.color.light
    landingModel.parts.desktop.color = "light"
   } else if (_.includeColor === "light" || (_.includeColor === "debug-dark" && _.command !== "debug")) {
    delete _.parts.desktop.color.dark
    landingModel.parts.desktop.color = "dark"
   }
   if (_.includeEra === "none") {
    delete _.parts.desktop.era
    delete landingModel.parts.desktop.era
    desktopFeatures--
   } else if (_.includeEra === "vintage" || (_.includeEra === "debug-modern" && _.command !== "debug")) {
    delete _.parts.desktop.era.modern
    landingModel.parts.desktop.era = "vintage"
   } else if (_.includeEra === "modern" || (_.includeEra === "debug-vintage" && _.command !== "debug")) {
    delete _.parts.desktop.era.vintage
    landingModel.parts.desktop.era = "modern"
   }
   if (_.includeKirejiApp === "none" || (_.includeKirejiApp === "full" && _.command !== "debug")) {
    delete _.app
    delete landingModel.app
   }
   const removeDesktopFeatures = () => {
    delete _.parts.desktop.icons
    delete landingModel.parts.desktop.icons
    delete _.parts.desktop.windows
    delete landingModel.parts.desktop.windows
    delete _.parts.desktop["task-bar"].tray
   }
   if (_.includeDesktop === "none" || (_.command !== "debug" && _.includeDesktop === "local-only")) {
    removeDesktopFeatures()
    delete _.parts.desktop["task-bar"]
    delete landingModel.parts.desktop.taskBar
    desktopFeatures--
   } else if (_.includeDesktop === "menu-only" || (_.command !== "debug" && _.includeDesktop === "full")) {
    removeDesktopFeatures()
    delete _.parts.desktop["task-bar"].tray
   }
   if (!desktopFeatures) {
    delete _.parts.desktop
    delete landingModel.parts.desktop
   }
   _["landing-model.json"] = JSON.stringify(landingModel)
   define(_, {
    landingModel: {
     value: landingModel
    },
    preBuildArchive: {
     // Temporary. Deleted when build is completed.
     value: serialize(_),
     configurable: true
    }
   })
  })
  logScope(1, "\nBuilding Parts", () => {
   const allParts = []
   const instances = []
   const allSubjects = []
   const partsByHost = []
   const imageSources = []
   const subjectIndices = new Map()
   const earlyImageSources = []
   /** @type {(host: string, base: string | string[]) => { host: string, part: IPartAny, domains: string[] }} */
   function resolveRelativeHost(host, base) {
    if (typeof host !== "string")
     throw new TypeError(`Resolve Relative Host Error: the given relative host must be a string (got ${typeof relativeHost}).`)
    if (host === "")
     return { host, part: _, domains: [] }
    if (!host.includes(".")) {
     host = `${host}.abstract.parts`
    } else {
     const relativeStepsBack = host.match(/\.*$/)[0].length
     if (relativeStepsBack) {
      if (typeof base === "string")
       base = base.split(".")
      else if (!Array.isArray(base))
       throw new TypeError(`can't resolve relative host "${host}" because the given base is not an absolute string host or an array of domains.`)
      host = (host.length === relativeStepsBack ? "" : host.slice(0, -relativeStepsBack) + ".") + base.slice(relativeStepsBack - 1).join(".")
     }
    }
    const domains = host.split(".")
    return {
     host,
     domains,
     ...domains.reduceRight(({ part }, subdomain, index) => {
      if (!part[subdomain])
       throw new ReferenceError(`There is no part called '${subdomain}' in ${[...domains].slice(index + 1).reverse().join("/") || `the ecosystem root`} (trying to resolve ${domains.join(".")}).`)
      return { part: part[subdomain], "..": part }
     }, { part: _, "..": null }),
    }
   }
   function lookup(host) {
    return partsByHost[host] ??= host.split(".").reduceRight((part, subdomain, index, domains) => {
     if (!part[subdomain])
      throw new ReferenceError(`There is no part called '${subdomain}' in ${[...domains].slice(index + 1).reverse().join("/") || `the ecosystem root`} (trying to resolve ${domains.join(".")}).`)
     return part[subdomain]
    }, _)
   }
   /** @type {(componentOwner: IPartAny) => IPartAny} */
   function collectBuild(componentOwner) {
    logScope(2, `"${componentOwner.domains.join(".")}"`, () => {
     define(componentOwner, {
      key: {
       value: componentOwner.domains[0]
      },
      host: {
       resolve() {
        if (this.host)
         throw new Error(`Part ${this.host} was already built.`)
        const host = this.domains.join(".")
        partsByHost[host] = this
        return host
       }
      },
      manifest: {
       resolve() {
        /** @type {IPartManifest} */
        const manifest = JSON.parse(componentOwner["part.json"] ?? "{}")

        // Prevent these properties from being inherited from the prototype manifest.
        manifest.abstract ??= false
        manifest.name ??= null
        manifest.actions ??= {}

        // Declare my global name (if defined).
        if (manifest.name !== null)
         globalThis[manifest.name] = this

        /* By the time we call this part's build action, it has access to its parent and child global names.
           The availability of branches of the hierarchy other than its own is unpredictable. */
        return manifest
       }
      },
      subparts: {
       value: []
      },
      prototype: {
       resolve() {

        if (this === _.parts.abstract.part)
         return null

        const { part: prototype, domains: prototypeDomains, "..": parent } = resolveRelativeHost(this.manifest.extends ?? "part", this.domains)

        // Build prototype chain before building self.
        if (!prototype.domains) {
         define(prototype, {
          "..": {
           value: parent
          },
          domains: {
           value: prototypeDomains
          }
         })
         collectBuild(prototype)
        }

        if (!prototype.isAbstract)
         throw new Error(`Hydration Error: parts can only extend abstract parts (${this.host} tried to extend ${prototype.host}).`)

        // Inherit from the prototype.
        Object.setPrototypeOf(this, prototype)
        Object.setPrototypeOf(this.manifest, prototype.manifest)
        Object.setPrototypeOf(this.manifest.actions, prototype.manifest.actions)

        prototype.inheritors.push(this)

        return prototype
       }
      },
      filenames: {
       value: Object.keys(componentOwner).filter(key => typeof componentOwner[key] === "string")
      },
      subdomains: {
       value: Object.keys(componentOwner).filter(key => typeof componentOwner[key] === "object")
      },
      inheritors: {
       value: []
      },
      isAbstract: {
       resolve() {
        return this.manifest.abstract
       }
      },
      components: {
       resolve() {
        const components = eval((() => {
         // Use IIFE to prevent script and source mapped file from being retained by eval scope.
         const sourceMappedFile = new SourceMappedFile()
         sourceMappedFile.copyFrom({ literal: `@components-open@({ // ${this.host}` })
         for (const filename of this.filenames) {
          subjectIndices.set(`${this.host}/${filename}`, allSubjects.push([this.host, filename]) - 1)
          sourceMappedFile.copyFrom({ literal: `@lock-file@\n "${filename}": { value: this["${filename}"], key: "${filename}", kind: "file", name: "${filename}", filename: "${filename}", enumerable: true, writable: ${environment === "node-main" && this === _ && filename === "compressedMetadata"}, size: ${new TextEncoder().encode(serialize({ [filename]: this[filename] })).length} },` })
          if (this.prototype && !filename.endsWith("_.js") && (filename + "_.js" in this.prototype))
           sourceMappedFile.copyFrom({ literal: `@shadow-dynamic@  "${filename}_.js": { value: undefined, key: "${filename}_.js", kind: "shadow", name: "Shadow ${filename}_.js", filename: "${filename}" },` })
          if (!filename.endsWith(".js")) {
           if (filename.endsWith(".png") || filename.endsWith(".gif")) {
            imageSources.push([this, filename])
            if (filename.startsWith("early-"))
             earlyImageSources.push([this, filename.slice(6)])
           } else if (!filename.includes(".") && filename.includes("-")) {
            const words = filename.split("-")
            words.push(words.shift())
            const key = camelCase(words)
            sourceMappedFile.copyFrom({ literal: `@alias@ "${key}": { get() { return this["${filename}"] }, key: "${key}", kind: "alias", name: "${titleCase(words)}", filename: "${filename}" },` })
           }
           continue
          }
          let key = filename.slice(0, -3)
          let kind = "action"
          let words = [key]
          if (key.endsWith("_")) {
           kind = "getter"
           words[0] = key = key.slice(0, -1)
           if (key.includes(".")) {
            words = key.split(".")[0].split("-")
            if (key.endsWith(".png") || key.endsWith(".gif")) {
             imageSources.push([this, key])
             if (key.startsWith("early-"))
              earlyImageSources.push([this, key.slice(6)])
            }
           } else if (key.includes("-")) {
            words = key.split("-")
            words.push(words.shift())
            key = camelCase(words)
           }
          } else if (key.includes("-")) {
           if (key.startsWith("symbol-")) {
            key = Symbol[words[0] = key.slice(7)]
           } else {
            words = key.split("-")
            words.push(words.shift())
            key = camelCase(words)
           }
          }
          const componentKeyString = typeof key === "symbol" ? `${key.description}` : `"${key}"`
          sourceMappedFile.copyFrom({ literal: `@component-open@ [${componentKeyString}]: { key: ${componentKeyString}, kind: "${kind}", name: "${titleCase(words)}", filename: "${filename}",` })
          sourceMappedFile.copyFrom({ literal: `@action-open@  ${kind === "action" ? `${filename.startsWith("async-") ? "async " : ""}value(${this.manifest.actions[filename.slice(0, -3)]?.join(", ") ?? ""})` : "get()"} {` })
          // BEGIN CODE-GEN
          const utilities = {
           "@base@": (...args) => (componentOwner.prototype?.components[componentKey].value ?? componentOwner.prototype?.components[componentKey].get).call(thisPart, ...args),
           "@error@": (msg, cause) => { const e = new Error(`${msg}\n\tat ${thisPart.path}\n\tat ${componentOwner.path}/${components[componentKey].filename}`, cause); e.name = componentOwner.name; return e },
           "@recurse@": (...args) => (components[componentKey].value ?? components[componentKey].get).call(thisPart, ...args)
          }
          const utils = new Set(this[filename].match(new RegExp(`(?:${Object.keys(utilities).map(mark => mark.slice(1, -1)).join("|")})(?=\\()`, "g")))
          if (utils.size || this[filename].match(/(?:^|\b)componentKey(?:\b|$)/g))
           sourceMappedFile.copyFrom({ literal: `@component-reference@   const componentKey = ${componentKeyString}` })
          const selfReferences = new Set((utils.size ? ("thisPart;" + this[filename]) : this[filename]).match(/this[A-Z]\w*/g))
          for (const selfReference of selfReferences)
           sourceMappedFile.copyFrom({ literal: `@self-reference@   const ${selfReference} = this;` })
          for (const key of utils)
           sourceMappedFile.copyFrom({ literal: `@${key}@   const ${key} = ${utilities[`@${key}@`]};` })
          // END CODE-GEN
          sourceMappedFile.copyFrom({ part: this, filename: filename, indent: 3 })
          sourceMappedFile.copyFrom({ literal: `@action-close@  }` })
          sourceMappedFile.copyFrom({ literal: `@component-close@ },` })
         }
         sourceMappedFile.copyFrom({ literal: `@components-close@})` })
         const script = sourceMappedFile.packAndMap()
         return script
        })())
        define(this, components)
        return components
       }
      }
     })
     componentOwner.distributeBuild()
    })
   }
   collectBuild(_)
  })
  bootLog(`
 ╭┈┈┈┈┈┈┈┈┈┈┈ BOOT SUCCEEDED ┈┈┈┈┈┈┈┈┈┈┈╮
 ┊ Booted Successfully                  ┊
 ┊                                      ┊
 ┊ End of synchronous script execution. ┊
 ╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯`
  )
 })
}

ƒ({
 verbosity: "1",
 change: "major",
 hangHydration: "0",
 defaultHost: "desktop.parts",
 port: "3000",
 mapping: "disabled",
 resetLocalState: "enabled",
 haltHydration: "disabled",
 includeWarning: "enabled",
 includeColor: "full",
 includeEra: "full",
 includeMenuItems: "full",
 includeKirejiApp: "full",
 includeDesktop: "full"
})