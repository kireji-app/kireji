declare interface IPart<TOwner, TSubpart>
 extends Iterable<TSubpart> {

 // Components.
 [Symbol.iterator](): IterableIterator<TSubpart>
 /** A special description of an abstract part which is not propagated to its instance parts. */
 readonly "abstractDescription": string
 /** A special title of an abstract part which is not propagated to its instance parts. */
 readonly "abstractTitle": string
 /** A JavaScript snippet used to automate the declaration of common constants for all actions and getters which refer to it in the part. */
 readonly "constants.js"?: string
 /** An optional short description of the part. */
 readonly "description"?: string
 /** An decorative title that uses unicode bold and mathematical characters to render the part's host name. */
 readonly "fancyTitle"?: string
 /** The part's index in it's parent domain. */
 readonly "index": number
 /** The path to the part in its instance hierarchy. */
 readonly "path": string
 /** Whether or not the part is connected to the view root for the purpose of view action propagation. If false, the part should be ignored from view actions but should retain all other functionality including being able to be enabled, contributing to cardinality, and having RID changes propagate. */
 readonly "isOpen": boolean
 /** The subdomain name used to identify the part in its parent domain. */
 readonly "key": string
 /** The number of subparts the part has. */
 readonly "length": number
 /** A getter that generates a JSON-compatible model value from the state of the part and its subparts. */
 readonly "model": any
 /** The raw JSON string used to construct the object at `thisPart.manifest`. */
 readonly "part.json": string
 /** A png icon that can represent the part and - for app parts - used as the app's icon and browser favicon. */
 readonly "part.png": string
 /** A JavaScript snippet representing global access to the part, available from HTML event handler attributes after hydration. */
 readonly "runtimeReference": string
 /** An optional display name for the part. */
 readonly "title"?: string
 /** Generates the attribute string that sets up an onpointerdown listener that calls `part[ACTION_NAME](event,this,...ARGS)`. Typically, use `pointer.handle({ ... })` within that action to react to manage complex events drag-and-drop, clicks, double clicks, etc. @remarks This approach will always use the pointer events (not click, touch or mouse events). Use `clickAttr` instead of `pointAttr` to create a traditional click event handler. */
 readonly pointAttr(ACTION_NAME: string = "point", ...ARGS: any[])
 /** Generates the attribute string that sets up an onclick listener that calls `part[ACTION_NAME](event,this,...ARGS)`. Using `pointAttr` with `pointer.handle({ ... })` is the preferred action of reacting to clicks but this event can be used for special cases like requesting a pointerlock, where the browser requires a proper click event. */
 readonly clickAttr(ACTION_NAME: string = "onclick", ...ARGS: any[])
 /** Registers a listener that calls RECEIVER[CALLBACK_NAME](this) after the event of the given type occurs. */
 readonly attach(EVENT_TYPE: string, RECEIVER: IPartAny, CALLBACK_NAME: string): void
 /** Unregisters the listener that calls RECEIVER[CALLBACK_NAME](this) after the event of the given type occurs. */
 readonly detach(EVENT_TYPE: string, RECEIVER: IPartAny, CALLBACK_NAME: string): void
 /** Calls receiver[callbackName](this) for every receiver/callback pair registered to the given event type. */
 readonly notify(EVENT_TYPE: string): void
 /** Computes the cardinality of the part from its subparts and defines its runtime properties. */
 readonly build(): void
 /** Finalizes and validates the part after the prototype chain (including the part) has successfully completed its build process. */
 readonly postBuild(): void
 /** Calls `loop()` on the part and then propagates the call leafward to all subparts. */
 readonly distributeLoop(): void
 /** Returns the subparts that meet the condition provided by FILTER_FUNCTION.  */
 readonly filter(FILTER_FUNCTION: (subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => TSubpart): TSubpart[]
 /** performs MAP_FUNCTION on every subpart of the part. */
 readonly forEach(MAP_FUNCTION: (subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => void): void
 /** Returns a boolean indicating whether or not the part includes the given SUBPART.  */
 readonly includes(SUBPART: TSubpart): boolean
 readonly reduce(REDUCE_FUNCTION: (result: TResult, subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => TResult, INITIAL_VALUE: TResult): TResult
 /** If defined, the per-frame update action for the part. Useful for implementing game features. */
 readonly loop?(): void
 /** Performs MAP_FUNCTION on every subpart of the part and returns an array of the results. */
 readonly map(MAP_FUNCTION: (subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => TResult): TResult[]
 /** Converts the given model to an RID without modifying the state of the part. */
 readonly modelToRID(MODEL: any): bigint
 /** A URI-encoded svg data segment that can represent the bounding box of a part image but is small enough to be inlined in image-heavy server-rendered views. */
 readonly placeholderImage(IMAGE_NAME: string): string
 /** A css variable representing the absolute css name of the given image, traversing the prototype chain if necessary. */
 readonly cssVariableOfImage(IMAGE_NAME: string): string
 /** Collects every build function in the part's prototype chain and then calls them all on the part itself. */
 readonly startBuild(): void
 /** Performs `thisPart.modelToRID()` on MODEL and then performs `thisPart.setRID()` on the resulting RID. */
 readonly setModel(MODEL: any, SKIP_RUNTIME_STATE_DISTRIBUTION: boolean = false)
 /** Sets the RID on the part to match the landing model (or RID 0n, if the part is not mentioned in the landing model). */
 readonly resetModel(MODEL: any, SKIP_RUNTIME_STATE_DISTRIBUTION: boolean = false)
 /** Sets the part's RID, propagating it leafward and rootward and updating all views.
  * 
  * If DELTA is true, NEW_RID is added to the part's current RID.
  * 
  * If SKIP_RUNTIME_STATE_DISTRIBUTION is true, the distribution flow will skip setting certain properties. It is assumed that these properties are being managed elsewhere. This is useful when a part's runtime state precision is greater than it's cardinality ("lossy" parts). */
 readonly setRID(NEW_RID: bigint, DELTA: boolean = false, SKIP_RUNTIME_STATE_DISTRIBUTION: boolean = false): void
 /** Recomputes and then updates the part's RID in response to a change in the the given subpart's RID.
  * 
  * If the part has a parent, it calls collectRID on that parent, passing the signal rootward.
  * 
  * If DEPTH is a number greater than 0, the signal only propagates that many times (including the part itself). */
 readonly collectRID(SUBPARTS: TSubpart[], DEPTH: number): void
 /** Updates the part's RID to NEW_RID and then recomputes all subpart RIDs to match.
  * 
  * For any active subparts, it calls distributeRID on them, passing the signal leafward.
  * 
  * To avoid redistributing the same RID, **check for RID changes *before* calling distributeRID**. */
 readonly distributeRID(NEW_RID: bigint, SKIP_RUNTIME_STATE_DISTRIBUTION: boolean = false): void
 /** If RID is in the part's range, sets the part to that RID while caching information about the previous RID. Otherwise, throws an error.
  * 
  * This action is called by both collectRID and distributeRID. It does not propagate the RID or update any views. */
 readonly updateRID(NEW_RID: bigint): void

 /** Creates all the references the ecosystem needs to react to user interaction that couldn't be established by the server- or offline-server-rendered snapshot. This may also be called by parts that have just been enabled, especially if their `addView()` action relies on introducing the snippet into the DOM that they introduce into the snapshot. */
 readonly hydrateView(): void
 /** Adds view elements and references which the part needs to have across its entire non-negative RID range. It is called whenever the part's RID becomes non-negative and when a snapshot first hydrates. */
 readonly addView(): void
 /** An updating function which runs every time the RID of a part changes to something other than `-1n`. */
 readonly updateView(): void
 /** Removes all view elements and references that were added by `addView` or `updateView`. */
 readonly removeView(): void
 /** If the part was just enabled, calls addView then calls collectAddView on any parent, passing the signal rootward.*/
 readonly collectAddView(): void
 /** Whether the part is enabled or not, calls collectUpdateView on any parent, passing the signal rootward. If the part is enabled, calls the part's own updateView.*/
 readonly collectUpdateView(): void
 /** If the part was just disabled, calls removeView and then calls collectRemoveView on any parent, passing the signal rootward.*/
 readonly collectRemoveView(): void
 /** While the ecosystem is setting its RID for the very first time, this calls `hydrateView()` on the part and then passes the signal leafward. */
 readonly distributeHydrateView(): void
 /** If the part just became enabled, calls addView and then calls distributeAddView on all subparts, passing the signal leafward.*/
 readonly distributeAddView(): void
 /** If the part is enabled, calls updateView on it and then calls distributeUpdateView on all subparts, passing the signal leafward.*/
 readonly distributeUpdateView(): void
 /** If the part was enabled, calls distributeRemoveView on any subparts that were also enabled, passing the signal leafward. Then, if the part is no longer enabled, calls removeView on itself.*/
 readonly distributeRemoveView(): void
 /** Searches the part prototype chain starting at the calling part and working towards the type root to find and return the nearest part which owns the given property. Returns null if the given property does not exist anywhere in the chain. */
 readonly resolveOwnerOfManifest(PROPERTY_KEY: string): IPartAny | null
 /** Returns a part whose host was provided as a (potentially relative) host name using the given property key in the part's manifest. This action uses the nearest part on which the manifest key is actually defined as the base for resolving any relative host name. Returns null if the given property does not exist anywhere in the chain. */
 readonly resolvePartFromManifest(PROPERTY_KEY: string): IPartAny | null
 /** Generates a returns a MathML string that depicts the cardinality equation of the platform. @param DEPTH the number of levels deep to expand the terms of the equation (up to Infinity) @param AS_EQUATION when true, begins the expression with something like `<math><msub><mi>k</mi><mi>part key</mi></msub><mo>=</mo>...` @param PARENTHESIZE whether or not to add parenthesis around the expression (useful when it will be nested in a larger one) (they will only be added if the resulting expression is not a single term). */
 readonly mathML(DEPTH: number = 0, EQUATION_TYPE: string = "none", LABELS: boolean = false, PARENTHESIZE: boolean = false, WRAP_IN_MATH_TAG: boolean = true): string
 /** Returns an array of string terms and operators which, when joined, depict the part's cardinality collecting arithmetic. */
 readonly subpartMathML(DEPTH: number, LABELS: boolean): string[]
 /** Counts the number of type inheritors the part has while sorting each inheritor by its own inheritor count. */
 readonly countAndSortInheritors(): number

 // Properties.
 /** The parent part.
  * 
  *  *Note: There is no* `_[".."]`. */
 readonly "..": TOwner
 /** The record of all event callbacks currently attached to the part. */
 readonly callbacks: Record<string, Record<string, [target: IPartAny, callbackName: string]>>
 /** The number of unique, non-negative RIDs the part supports, used heavily to compute routing across the user space. */
 readonly cardinality: bigint
 /** The difference between the current RID and the previous one. */
 readonly deltaRID: bigint
 /** True if the RID of the part just changed in the current, still incomplete RID propagation cycle.
  * 
  * Unlike other historical RID properties which hold information about the part's last RID change even if that change occurred one or more cycles ago, this property is always cleared at the end of the cycle so that view functions are not run multiple times. */
 readonly dirty: true | undefined
 /** Whether or not the part has an RID equal to `-1n`. */
 readonly disabled: boolean
 /** The array of subdomain names corresponding to `thisPart.host` split along ".". */
 readonly domains: string[]
 /** The set of parts which extend from the part. */
 readonly inheritors: IPartAny[]
 /** Whether or not the part has an RID greater than `-1n`. */
 readonly enabled: boolean
 /** The list of static asset names for the part. */
 readonly filenames: string[]
 /** The domain name used to identify the part. */
 readonly host: string
 /** A map of the component configurations that were used to add components to the part during hydration. */
 readonly components: Record<string, IComponentDefinition>
 /** The source file object that compiles to become the property descriptor map for the part's components. */
 readonly sourceFile: SourceMappedFile
 /** Whether or not the part is an abstract part. All parts can be extended, but abstract parts don't participate in the routing function or run a build step. They also can't be listened to. */
 readonly isAbstract: boolean
 /** Whether or not the part just became enabled at the most recent RID change.
  * 
  * Equal to:
  * ```
  * thisPart.enabled && !thisPart.wasEnabled
  * ```*/
 readonly justEnabled: boolean
 /** Whether or not the part just became disabled at the most recent RID change.
  * 
  * Equal to:
  * ```
  * !thisPart.enabled && thisPart.wasEnabled
  * ```*/
 readonly justDisabled: boolean
 /** The object created by parsing the part's "part.json" and assigning its prototype to the part's prototype's own manifest. */
 readonly manifest: IPartManifest
 /** The previous RID of the part, changed at the last call to distributeRID or collectRID. */
 readonly previousRID: bigint
 /** The part's prototype part. @remarks The part `part.abstract.parts` does not have a prototype part. */
 readonly prototype?: IPartAny
 /** The current route identifier (RID) of the part, expressed as a bigint index into the virtual array of all of its valid states. */
 readonly rid: bigint
 /** Whether or not the part has a running task */
 readonly running: boolean
 /** The array of child parts which are not abstract. */
 readonly subparts: TSubpart[]
 /** The list of subdomains for the part whose source code is currently being evaluated. */
 readonly subdomains: string[]
 /** Whether or not the part was enabled before the most recent RID change. */
 readonly wasEnabled: boolean
}

declare interface IPartManifest {
 /** Whether or not the part should be considered a subpart of its parent part (abstract = false) or an uninstanceable prototype for other parts (abstract = true). */
 readonly abstract?: boolean
 /** The list of actions that the part adds. The prototype of the actions object is set to the part's prototype's manifest actions object. If no object is defined in a manifest, the empty object will be created automatically. */
 readonly actions?: Record<string, string[]>
 /** The relative or absolute host name of the part that this part inherits from. The default value is `part`. */
 readonly extends?: string
 /** An optional string array of subpart keys representing the explicit order that the subparts should take in the part's subpart array. This affects how parts are iterated over and how they are integrated into the hash function. */
 readonly order?: string[]
 /** An optional string that uniquely represents the part in the global namespace. */
 readonly name?: string
}

declare type IPartAny =
 IPart<IPartAny | null, IPartAny | null>

declare interface IWebView {

 // Components.
 /** The optional css content of the view, given the current state. */
 readonly "part.css"?: string
 /** The optional html content of the view, given the current state. */
 readonly "part.html"?: string
}

/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis in IDEs.*/
declare const thisPart: IPartAny
declare const Base = _.parts.abstract.part
type Base = T
/** The component object describing the currently running action. */
declare const component: IComponentData
/** The prototype part action which the currently running action overrides (if one is defined). */
declare function base(...args): any
/** The current function, so that it can be called again from within itself. */
declare function recurse(...args): any
/** Sets the current ecosystem RID and host app as the undo point (the state the back button will return to). */
declare function setUndoPoint(): void
/** The current incoming RID argument. @remarks Available within distributeRID, setRID and updateRID actions only. */
declare const NEW_RID: bigint
/** The part on which an event occurred. @remarks Where available as an argument passed to a part listener callback. */
declare const SENDER: IPartAny
/** If on the client, returns whether or not the server-rendered view has been taken over by the client front-end framework. */
declare const hydrated: boolean | null