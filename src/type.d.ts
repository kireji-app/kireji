// This type document represents everything that is available in the Component global scope.
/** The boot function for the interface which acts as the main entry point for all environments running the ecosystem. This function simplifies the process of deploying from the node-main environment to other environments (node-module, server, offline server, client) by wrapping the bootstrap in a single file such that `ƒ.toString(); ƒ(${ ... })` reproduces the bootstrap script while also allowing custom inlined arguments. */
declare function ƒ(_: IEcosystem): void
/** This is the root part of the ecosystem, considered the ecosystem itself. @remarks When JSON stringified, it should inline all information compiled from the git repo in node by the build process. The serialized version should not include any components or properties that are added during or after the build process. This means that all runtime values should be non-enumerable and defined using the `define()` action. */
declare const _: IEcosystem
type _ = T
/** A collection of utilities for handing BigInt route identifiers (RIDs). */
declare class RID {
 /** Trades a versioned string pathname for the bigint RID. */
 static fromPath(pathname: string): bigint
 /** Trades a string segment for the bigint RID. */
 static fromHash(pathname: string): bigint
 /** Trades a bigint RID for a versioned string pathname. */
 static toPath(rid: bigint): string
 /** Trades a bigint RID for a string segment. */
 static toHash(rid: bigint): string
 /** Produces a cryptographically random RID between 0 and one less than the given cardinality. */
 static random(cardinality: bigint): bigint
}
/** A utility class for handling arbitrary-length vectors. Any object with entirely numeric values can be treated as a vector. */
declare class Vector {

 /** Creates the vector object `{ x, y }`. */
 static 2(x: number = 0, y: number = 0): IVector2
 /** Creates the vector object `{ x: 0, y: 0, z: 0 }`. */
 static 3(x: number = 0, y: number = 0, z: number = 0): IVector3

 /** Provides the absolute value (length) of the the given vector. Returns a number. */
 static magnitude<TVector extends IVector>(vector: TVector): number
 /** Normalizes the given vector so that its magnitude is exactly 1. Returns a vector of the same dimension. */
 static normalize<TVector extends IVector>(vector: TVector): TVector
 /** Returns the sign of the given vector. Returns a vector of the same dimension. */
 static sign<TVector extends IVector>(vector: TVector): TVector
 /** Returns a vector of the same dimension with all components floored. */
 static floor<TVector extends IVector>(vector: TVector): TVector

 /** Performs the given binary operation on vector a and number b. Returns a vector of the same dimension as vector a. */
 static operate<TVector extends IVector>(a: TVector, b: number, operation: TOperation): TVector
 /** Performs the given binary operation on number a and vector b. Returns a vector of the same dimension as vector b. */
 static operate<TVector extends IVector>(a: number, b: TVector, operation: TOperation): TVector
 /** Performs the given binary operation on vectors a and b. They must have the same dimension. Returns a vector of the same dimension. */
 static operate<TVector extends IVector>(a: TVector, b: TVector, operation: TOperation): TVector
 /** Performs the given binary operation on numbers a and b. Returns a number. */
 static operate(a: number, b: number, operation: TOperation): number

 /** Adds vector a to number b. Returns a vector of the same dimension as vector a. */
 static add<TVector extends IVector>(a: TVector, b: number): TVector
 /** Adds number a to vector b. Returns a vector of the same dimension as vector b. */
 static add<TVector extends IVector>(a: number, b: TVector): TVector
 /** Adds vectors a to b. They must have the same dimension. Returns a vector of the same dimension. */
 static add<TVector extends IVector>(a: TVector, b: TVector): TVector
 /** Adds numbers a to b. Returns a number. */
 static add(a: number, b: number): number

 /** Subtracts number b from vector a. Returns a vector of the same dimension as vector a. */
 static subtract<TVector extends IVector>(a: TVector, b: number): TVector
 /** Subtracts vector b from number a. Returns a vector of the same dimension as vector b. */
 static subtract<TVector extends IVector>(a: number, b: TVector): TVector
 /** Subtracts vector b from vector a. They must have the same dimension. Returns a vector of the same dimension. */
 static subtract<TVector extends IVector>(a: TVector, b: TVector): TVector
 /** Subtracts number b from number a. Returns a number. */
 static subtract(a: number, b: number): number

 /** Multiplies vector a by number b. Returns a vector of the same dimension as vector a. */
 static multiply<TVector extends IVector>(a: TVector, b: number): TVector
 /** Multiplies number a by vector b. Returns a vector of the same dimension as vector b. */
 static multiply<TVector extends IVector>(a: number, b: TVector): TVector
 /** Multiplies vectors a and b. They must have the same dimension. Returns a vector of the same dimension. */
 static multiply<TVector extends IVector>(a: TVector, b: TVector): TVector
 /** Multiplies numbers a and b. Returns a number. */
 static multiply(a: number, b: number): number

 /** Returns the dot product of the two vectors. The vectors must have the same dimension. Returns a number. */
 static dot<TVector>(vector1: TVector, vector2: TVector): number
}
/** A data type which can be used to performantly rank and unrank permutation indices. The `size` argument must be a BigInt representing the length of the superset from which the permutation will be chosen. */
declare class FenwickTree {
 readonly size: bigint
 readonly powerFloor: bigint
 constructor(size: bigint): FenwickTree
 update(i: bigint, val: bigint): void
 query(i: bigint): bigint
 findNthAvailable(n: bigint): bigint
}
/** A type used for source mapping and packing data from one or more files into a single new file. */
declare class SourceMappedFile {
 copyFrom(ISourceMappedFileCopyDefinition): void
 packAndMap(): string
}
declare function log(verbosity: number, ...data: any[]): void
declare function warn(...data: any[]): void
declare function debug(...data: any[]): void
declare function logAny(verbosity, data: any[], method: keyof typeof console): void
declare function logError(data: any[]): void
/** Opens a collapsed log group with the given label at the given verbosity, calls the given callback (passing a log function with the same verbosity as an argument), closes the log group, then returns the result of the callback. */
declare function logScope(verbosity: number, LABEL: string, CALLBACK: (log: (...data) => void) => T): T
declare function logEntropy(verbosity: number, ...parts: IPartAny[]): void
declare function logStringSize(verbosity: number, string: string): void
/** A special wrap around logScope which logs server events with a reliable server format. */
declare function logServerScope(col1, col2, col3, CALLBACK: (log: (...data) => void) => T): T
declare function toBits(cardinality, unit = true)
declare function toCharms(cardinality, unit = true)
/** Performs a `btoa` operation on a base64 encoded string but returns an ArrayBuffer instead of a binary string. */
declare function atoBuffer(base64: string): ArrayBuffer
declare function camelCase(words, delimiter = "-")
declare function titleCase(words, delimiter = "-")
/** A function which wraps JSON.stringify using a replacer which can serialize BigInt values. */
declare function serialize(value: any): void
/** Returns a string representing the given bigint in scientific notation (a coefficient times 10 to some power). When html is true, the power will be wrapped in a superscript tag. Otherwise, it will use unicode superscript characters. */
declare function scientific(x: bigint, html: boolean = false): string
/** Performs the `btoa` method on strings that contain unicode characters. */
declare function btoaUnicode(text: string): string
/** Makes the given text html-friendly by escaping special characters using ampersand codes. */
declare function sanitizeAttr(string: string): string
/** Extends the definition of the given part by allowing the addition of custom properties.
 * 
 * All properties are added using this action.
 * 
 * No property descriptor should have its "enumerable" property set to true, as that would make the property appear to be a component which can only be added by adding a new file into the part's repository folder. */
declare function define<T>(part: T, definition: IRuntimePropertyDefinitions<T>): T
/** A string representing which of three known environments the ecosystem is running on.
 * 1. "node-main"
 *     - Unpacked in a clone of the project git repo in node.
 *     - It's called by `npx kireji` in order to perform operations like pack the repo into a single client artifact and run as a backend to serve that artifact and to server-render HTML.
 *     - Its state (when it runs as a server) is set by http requests at the designated port.
 * 2. "node-module"
 *     - Packed and archived, loaded in as a module via `require` by the main node module.
 *     - It acts as a proxy for a previous version of the project, when matching versioned URLs are fetched.
 *     - Its state is set by proxy requests passed through by the main node module.
 * 3. "offline-server"
 *     - Packed and deployed as the browser's ServiceWorker.
 *     - It's booted by the browser after a client registers it.
 *     - Its state is set by client fetch requests.
 * 3. "client"
 *     - Packed and deployed as a front-end framework hydrating a browser tab.
 *     - It's booted by a script tag added to the server- or offline-server-rendered html file.
 *     - Its state is initially set by `location.href` (whatever is in the address bar) and then set by user interaction thereafter. */
declare const environment: "client" | "offline-server" | "node-main" | "node-module"
/** A map that provides information about whether a subject was defined in the project repository (true) or only in the kireji framework package (false). */
declare const metadata: Map<string, boolean>
/** The immutable list of every part of the root space, in order of when the were reached during recursive part hydration. */
declare const allParts: IPartAny[]
/** The immutable list of runtime instances for the root space, in order of when the were reached during recursive part hydration. */
declare const instances: IPartAny[]
/** A host-keyed map of all parts in the ecosystem. */
declare const partsByHost: Record<string, IPartAny>
/** The immutable list of every part host and filename combination, in order of when the were reached during recursive part hydration. */
declare const allSubjects: [host: string, filename?: string]
/** The immutable list of every `.png` or `.gif` image in the ecosystem, used by optimization processes that reduce the size of the server-rendered artifact. */
declare const imageSources: [[part: IPartAny, filename: string]]
/** A map that provides the index (in the `allSubjects` array) for the given subject. */
declare const subjectIndices: Map<string, number>
/** The immutable list of every highly compressed stand-in for `.png` or `.gif` images in the ecosystem. When defined, these images are used in place of their larger counterparts in the server-rendered page. Only these images are included in the server-rendered page; all other images appear after client-size hydration is complete. */
declare const earlyImageSources: [[IPartAny, string]]
/** Returns the part with the given host, throwing an error if no part exists with that host. */
declare function lookup(host): IPartAny
/** Uses the base to resolve the given relative host string to an absolute host name and returns an object with the resulting host, part, and domains array. */
declare function resolveRelativeHost(host: string, base: string | string[]): { host: string, part: IPartAny, domains: string[] }
/** Builds the given serialized part instance but first building its prototype chain and then building its children before finally calling the part-specific `build.call(thisArg)` action its entire prototype chain (including itself; starting from the base type) with `thisArg` always being the part itself. If the part is already built, the method returns without doing anything. */
declare function collectBuild<T>(part: T, domains: string[], isRuntimeInstance: boolean = false): void
/** The part on which the currently running component is actually defined (as opposed to the part on which it was called). */
declare const componentOwner: IPartAny
/** The host used to find all of the source code for the part whose code is currently being evaluated. */
declare const host: string
/** The component owner's (as opposed to the part on which it was called) component descriptor map which includes this component. */
declare const components: Record<string, IComponentDefinition>

declare interface IEcosystem
 extends IMix<null, ITopLevelDomainAny>,
 IKirejiConfig,
 IWebView {

 // Subparts.
 readonly app: IAppTLD
 readonly parts: IParts

 // Components.
 /** The command that was passed in to create the main module in Node.js. */
 readonly "command": string
 /** The git branch for the current build version. */
 readonly "branch": string
 /** A single boilerplate intro that shows basic info about the ecosystem. Mainly used to beautify build logs and command line output. */
 readonly "welcomeMessage": string
 /** The date that the HEAD commit was added to the branch in git. */
 readonly "modified": string
 /** The name of the parent git repository folder, used to represent the name of the ecosystem itself. */
 readonly "name": string
 /** The hash of the most recent git commit at build time. */
 readonly "gitSHA": string
 /** The automatically generated semantic version number of the current build. */
 readonly "version": string
 /** The automatically generated HTTP identifier for the build. */
 readonly "ETag": string
 /** The current unix timestamp, acquired using the high-precision performance.now() + performance.timeOrigin. */
 readonly "now": DOMHighResTimeStamp
 /** A stylesheet containing CSS variables with `url()` values that correspond to images. Used to seamlessly hand-off image rendering from the server-rendered page to the client-rendered page without modifying the DOM. */
 readonly "images.css": string
 /** The open part's PWA manifest. */
 readonly "pwa.json": string
 /** A JSON object serializing the desired landing model of the ecosystem. */
 readonly "landing-model.json": string
 /** A base64-encoded string which represents a portable bitmask that compresses the `_.metadata` map in hydration order (because that order is identical between environments). In the "node-main" environment, this value cannot be computed after after the build process is complete. */
 readonly "compressedMetadata": string
 /** A map between part and file identifiers and a boolean value indicating whether or not the given part comes from the Kireji framework node package or from the user repo. */
 readonly "metadata": Map<string, boolean>
 /** Returns a packed version of the entire repo as a stand-alone script that boots the ecosystem. */
 get "build.js"(): string
 /** Returns the given HTML document with images (using `early-*` compressed images for server- or offline-server-rendered snapshots) into the head as style tag(s). This is used for enhancing the first page appearance when using server-side rendering. When injecting early images, it scans the given document for image usages to determine which early images the snapshot requires. */
 readonly injectImages(HTML_DOCUMENT: string): string
 /** Handles standard anchor link clicks in one of four ways:
   * 1. For canonical links in the current app: calls `_.translateCanonicalPathname` on the anchor's href and then goes to the returned internal route.
   * 2. For links to other parts with no pathname: sets the current open part by navigating to the given host, bringing the current pathname with it.
   * 3. For canonical links to other parts: does both of the above.
   * 4. For links to origins outside of the ecosystem: opens a new tab that navigates to the anchor's href. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 /** Translates an SEO-friendly canonical pathname into a versioned, stateful route, using the current ecosystem state as the base state. */
 readonly translateCanonicalPathname(CANONICAL_ROUTE: string): string
 /** Sets the configuration space to match the given request url string. */
 readonly setRoute(REQUEST_URL: string): void
 /** Performs automated build-time unit tests to validate the state of the build. */
 readonly validate(): void
 /** Navigates to the given host by setting the current location. An undo point is automatically set by the browser. @remarks Client-only */
 readonly gotoPart(HOST: string): void

 // Properties.
 /** The ecosystem's currently opened part, encoded by the host of the current URL. */
 readonly openTask: IPartAny
 /** The hash of the desired landing page, as computed from data parameters during the initial boot process. */
 readonly landingHash: string
 /** The model of the desired landing page, used during the initial boot process to compute `_.landingHash` and `_.landingRID`. */
 readonly landingModel: object
 /** The RID of the desired landing page, as computed from data parameters during the initial boot process. */
 readonly landingRID: bigint
 /** A boolean that is set to `true` as soon as the RID is set for the first time. */
 readonly initialized: undefined | true
}
declare interface IKirejiConfig {
 /** * Determines which color mode features will be included in the ecosystem. 
  * - `none`: The color part will never be included.
  * - `light`: Dark mode will never be included.
  * - `dark`: Light mode will never be included.
  * - `debug-dark`: Dark mode will only be included in local builds.
  * - `debug-light`: Light mode will only be included in local builds.
  * - `full`: The full color part will always be included.
  * * @remarks When the menu and both colors are included, the color control will appear in the menu.
  */
 readonly "includeColor": "none" | "light" | "dark" | "debug-dark" | "debug-light" | "full"
 /** * Determines which era mode features will be included in the ecosystem.
  * - `none`: The era part will never be included.
  * - `vintage`: Modern mode will never be included.
  * - `modern`: Vintage mode will never be included.
  * - `debug-modern`: Modern mode will only be included in local builds.
  * - `debug-vintage`: Vintage mode will only be included in local builds.
  * - `full`: The full era part will always be included.
  * * @remarks When the menu and both eras are included, the era control will appear in the menu.
  */
 readonly "includeEra": "none" | "vintage" | "modern" | "debug-modern" | "debug-vintage" | "full"
 /** * Determines whether a list of apps should be included in the menu.
  * - `none`: Apps will never appear in the menu.
  * - `local-only`: Apps will only appear in the menu in local builds.
  * - `full`: Apps will always appear in the menu.
  * * @remarks Has no effect on builds where the menu is not included or when there are no defined menu apps.
  */
 readonly "includeMenuItems": "none" | "local-only" | "full"
 /** * Determines whether or not the version updating features should be included in the menu.
  * - `none`: Update features will never appear in the menu.
  * - `local-only`: Update features will only appear in the menu in local builds.
  * - `full`: Update features will always appear in the menu.
  * * @remarks Has no effect on builds where the menu is not included.
  */
 readonly "includeKirejiApp": "none" | "full" | "demo"
 /** * Determines whether or not the ecosystem should include desktop-like features.
  * - `none`: The desktop experience will never be included.
  * - `menu-only`: Only the menu will be included, and it will always be included.
  * - `local-only`: The full desktop experience will only be included in local builds.
  * - `full`: The menu will always be included. The desktop experience will only be included in local builds.
  * - `demo`: The full desktop experience will always be included (used only for Demo Ecosystem).
  */
 readonly "includeDesktop": "none" | "menu-only" | "local-only" | "full" | "demo"
 /** * One of three strings representing the severity of the API change. 
  * - `major`: A breaking change which breaks existing hash assignments.
  * - `minor`: A non-breaking change which adds new hash assignments.
  * - `patch`: A non-breaking change which does not impact hash assignments.
  */
 readonly "change": "major" | "minor" | "patch"
 /** A number used to control the detail in logs. Only messages with a priority <= this number will be logged. */
 readonly "verbosity": string
 /** The host of the desired default app. The server will redirect to this when testing locally. */
 readonly "defaultHost": string
 /** The internal port (typically 3000-4000) where the server will be hosted. */
 readonly "port": string
 /** * Determines whether or not the artifact should be output with embedded source map data. 
  * - `0`: Disabled
  * - `1`: Enabled
  */
 readonly "mapping": "disabled" | "enabled"
 /** * If enabled, halts the hydration of the client completely. Useful for debugging FOUC. 
  * - `0`: Disabled
  * - `1`: Enabled
  */
 readonly "haltHydration": "disabled" | "enabled"
 /** * If enabled, a warning line appears at the top of the client window at all times regarding alpha status. 
  * - `0`: Disabled
  * - `1`: Enabled
  */
 readonly "includeWarning": "disabled" | "enabled"
 /** * If enabled, the client window will reset to the landing hash when the service worker is replaced. 
  * - `0`: Disabled
  * - `1`: Enabled
  */
 readonly "resetLocalState": "disabled" | "enabled"
 /** A string representing how long the main thread should hang to simulate loading. Useful for debugging FOUC. */
 readonly "hangHydration": string
 /** The URL to a git repository where the project can be explored. Used by the built-in framework apps for creating external links. */
 readonly "gitHubRepo": string
 /** The space-separated list of part hosts which are publicly reachable by DNS records. */
 readonly "publicHosts": string
}

/** All of the data collected about the source of each component added to the part during hydration. */
declare const component: IComponentDefinition
/** The dedicated SourceMappedFile for the object which was created while building the part. */
declare const sourceFile: SourceMappedFile
/** The index of build.js in the list of source mapping files for the part's dedicated SourceMappedFile instance. */
declare const buildSource: number
/** The path to the folder in the git repo containing the source code for the part. */
declare const pathFromRepo: string
/** The list of subdomains for the part whose source code is currently being evaluated. */
declare const subdomains: string[]
/** The list of static assets for the part whose source code is currently being evaluated. */
declare const filenames: string[]

declare interface ISourceMappedFileCopyDefinition {
 /** The part which owns the original source file. Defaults to the ecosystem root. */
 part?: IPartAny = _
 /** The filename of the original source file. Defaults to "build.js". */
 filename?: string = "build.js"
 /** The number of spaces to add to the beginning of the line(s) of the copied content in the output file. Useful for nice output formatting. */
 indent?: number = 0
 /** If provided, the part and filename must correspond to the script which created the literal and the string must begin with a special "source mark" which appears exactly once in the source file, is exactly the same in both the source file and the literal string, and which is used to map the output code directly to the source code that created the literal string. */
 literal?: string = undefined
 /** If provided, takes only the given line from the source file. If both `ln` and `literal` are omitted, the entire file will be copied verbatim from source to output. */
 ln?: number = undefined
}
/** Converts a base64-encoded string to an ArrayBuffer. */
declare function btoaBuffer(BODY: string): string
/** A unicode-safe replacement for btoa. */
declare function btoaUnicode(BODY: string): string
/** Represents metadata for a single file or component of the part. If the component is a getter or action, it parses the components's ID and generates its signature, dynamic constants and body. If the component is a static file, a getter is created automatically. */
declare interface IComponentDefinition
 extends IRuntimePropertyDefinition {
 /** The type of component. If "file", the component is a value property storing an original source file as a string. If 'alias', the component is a getter that gets a file using a different key. If "getter", the component represents a file or value whose content depends upon the state of the part. If "action", the component represents a method that can be called on the part. */
 readonly kind: "file" | "shadow" | "alias" | "action" | "getter"
 /** The key used to access the component on the part. For files, this is the original filename. For output components, this is generated deterministically from the filename. */
 readonly key: string
 /** If the component is a file, this represents any secondary component that was generated by this file. */
 readonly output?: IComponentDefinition
 /** If the component is not a file this represents the file that was used to generate this component. */
 readonly file?: IComponentDefinition
 /** This represents a beautified (space-separated, title case) name of the part generated from its filename.  */
 readonly name: string
 /** If the component is a file, the archival size of the file in bytes (including any escape characters, base64 encoding, and the overhead of its filename). */
 readonly size?: number
}
/** The incoming request url string. @remarks Only in _.setRoute(). */
declare const REQUEST_URL: string
/** The Unix timestamp (in ms) when the current instance of the ecosystem started booting. */
declare const bootStartTime: number

declare type IRuntimePropertyDefinitions<T> = {
 [P in keyof T]: IRuntimePropertyDefinition<T, T[P]>
} & {
 [key: string]: IRuntimePropertyDefinition<T, any>
}

declare type IRuntimePropertyDefinition<TOwner, TValue> = {
 resolve(this: TOwner): TValue
 readonly value?: TValue
 readonly writable?: boolean
 readonly configurable?: boolean
 enumerable: never
}

declare type TOperation = (a: number, b: number) => number

declare type IVector = Record<string, number>
declare type IVector2 = { x: number, y: number }
declare type IVector3 = { x: number, y: number, z: number }

declare type KirejiConfigColor =
 /** The color part will never be included. */
 | "none"
 /** Dark mode will never be included. */
 | "light"
 /** Light mode will never be included. */
 | "dark"
 /** Dark mode will only be included in local builds. */
 | "debug-dark"
 /** Light mode will only be included in local builds. */
 | "debug-light"
 /** The full color era will always be included. */
 | "full"

declare type KirejiConfigEra =
 /** The era part will never be included. */
 | "none"
 /** Modern mode will never be included. */
 | "vintage"
 /** Vintage mode will never be included. */
 | "modern"
 /**  Modern mode will only be included in local builds. */
 | "debug-modern"
 /** Vintage mode will only be included in local builds. */
 | "debug-vintage"
 /** The full era part will always be included. */
 | "full"

declare type KirejiConfigMenuItems =
 /** Apps will never appear in the menu. */
 | "none"
 /** Apps will only appear in the menu in local builds. */
 | "local-only"
 /** Apps will always appear in the menu. */
 | "full"

declare type KirejiConfigUpdates =
 /** Update features will never appear in the menu. */
 | "none"
 /** Update features will only appear in the menu in local builds. */
 | "local-only"
 /** Update features will always appear in the menu. */
 | "full"

declare type KirejiConfigKirejiApp =
 /** kireji.app will never be included. */
 | "none"
 /** kireji.app will only be included in local builds. */
 | "full"
 /** kireji.app will always be included (used only for Demo Ecosystem). */
 | "demo"

declare type KirejiConfigDesktop =
 /** The desktop experience will never be included. */
 | "none"
 /** Only the menu will be included, and it will always be included. */
 | "menu-only"
 /** The full desktop experience will only be included in local builds. */
 | "local-only"
 /** The menu will always be included. The desktop experience will only be included in local builds. */
 | "full"
 /** The full desktop experience will always be included (used only for Demo Ecosystem). */
 | "demo"

declare type KirejiConfigChange =
 /** A breaking change which breaks existing hash assignments. */
 | "major"
 /** A non-breaking change which adds new hash assignments but doesn't break existing ones. */
 | "minor"
 /** A non-breaking change which does not impact hash assignments at all. */
 | "patch"

/** A shorthand for document.querySelector */
declare const Q: typeof document.querySelector
/** Checks if the given pointer event occurred within the given dom rectangle. */
declare const inRect: (pointerEvent: PointerEvent, domRect: DOMRect) => boolean