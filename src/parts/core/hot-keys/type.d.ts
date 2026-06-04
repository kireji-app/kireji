declare interface IHotKeys
 extends IFacet<ICore> {

 // Components.
 /** A canonical shortcut key string which can identify a specific keyboard shortcut and will used to trigger a hotkey action, if a matching action exists. */
 readonly "combo": string
 /** The raw JSON that is turned into `hotKeys.table` at runtime. */
 readonly "table.json": string
 /** Employs the browser session history as an undo cache by activating the standard forward button behavior. */
 readonly redo(): void
 /** Employs the browser session history as an undo cache by activating the standard back button behavior. */
 readonly undo(): void

 // Properties.
 /** The OS-specific key code prefix equal to "Meta" on macOS and "Control" on all other operating systems. */
 readonly contextPrefix: "Meta" | "Control"
 /** The set of keys which the user is currently pressing. */
 readonly pressed: Set<string>
 /** A table, parsed from hotKeys["table.json"], which relates canonical keyboard shortcuts to action names defined on the hotKeys object. It act as a global default hot keys map for all apps. */
 readonly table: Record<string, string>
}

declare const HotKeys: IHotKeys
type HotKeys = T