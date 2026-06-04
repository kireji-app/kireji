declare interface IAddressBar
 extends IFacet<ICore> {

 // Components.
 /** Takes the current location.href and uses it to set the full ecosystem state. */
 readonly useRoute(): void
 /** Pushes the current ecosystem RID onto the history stack to mark the current state as the undo point (where the back button will return to). */
 readonly setUndoPoint(): void

 // Properties.
 /** The minimum time between address bar changes, used to throttle them to prevent from triggering the browser's own, much more aggressive throttle. */
 readonly throttleDuration: number
 /** The last time the address bar throttle function allowed the address bar to be set. */
 readonly throttleStartTime: number
 /** The most recent RID set to the address bar. */
 readonly RIDCache: bigint
 /** The identification number for the most recently set timeout, if one is currently set. */
 readonly timer?: number
}

declare const AddressBar: IAddressBar
type AddressBar = T