declare interface IOfflineServer
 extends IFacet<ICore>,
 IWebView {

 // Components.
 readonly "manifestLink": string
 /** Ensures that there is a valid service worker for the current page, whether it was server- or client-rendered or the result of a "hard" reload (which fetches from the server and prevents the service worker from becoming the page's controller). */
 readonly async takeControlAsync(): Promise<void>

 // Properties.
 readonly registration: ServiceWorkerRegistration
 readonly controller: ServiceWorker,
}

declare const OfflineServer: IOfflineServer
type OfflineServer = T