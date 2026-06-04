declare interface IUpdateManager
 extends IFacet<ICore>,
 IWebView {

 // Components.
 /** Reacts to clicking the update button.
  * 
  * If an update is available, navigates to a URL that tells the server how to perform the upgrade without losing state data.
  * 
  * Otherwise, fetches the latest version from the server, compares it to the current version and optionally sets the update version and reflects it in the UI. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 /** Takes a single version number string and returns true of the incoming version represents a newer version number than the currently running version.
  * 
  * Throws an error if the input is not a string. Throws a syntax error if the input is not a correctly formatted semantic version number. */
 readonly isNewerVersion(INCOMING_VERSION: string): boolean

 // Properties.
 /** If an update is found, the latest version number. Otherwise, `null`. */
 readonly version?: string
 /** The array of service worker registrations that is active for the current host. */
 readonly registrations: ServiceWorkerRegistration[]
}

declare const Update: IUpdateManager
type Update = T