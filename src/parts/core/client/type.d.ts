declare interface IClient
 extends IFacet<ICore> {

 // Components.
 /** Requests an animation frame that distributes the loop function throughout the ecosystem and calls itself again. @remarks Can only be run on the client. */
 readonly requestLoop(REQUEST_TIME: DOMHighResTimeStamp): void
 /** The click event handler that is used globally on the client to prevent the click event from taking precedence over pointer events. */
 readonly blockClicks(POINTER_EVENT: PointerEvent): void

 // Properties.
 /** Whether or not the server-rendered page has been fully "taken over" by the client-side framework. @remarks Can only become true in the client environment. */
 readonly hydrated: boolean
 /** The averaged framerate of the app over a certain time window. @remarks Defaults to `60` before the first loop and when not in the client environment. */
 readonly fps?: number
 /** The current session time, aligned to the client refresh rate by `requestAnimationFrame`. @remarks Defaults to 'null' on first loop and when not in the client environment.*/
 readonly now: number
 /** The difference between the session time of the current frame and the session time of the previous frame. @remarks Defaults to `1000 / 60` before the first loop and when not in the client environment. */
 readonly deltaTime: number
 /** The average length of time each frame is on screen in milliseconds. @remarks Defaults to `1000 / 60` before the first loop and when not in the client environment. */
 readonly meanFrameTime?: number
}

/** A facet which helps toggle the page style between a locked loading state (before hydration) and a fully-interactive state (after hydration). It also starts and continues the engine loop. */
declare const Client: IClient
type Client = T
/** The animation frame timestamp when the action was called. @remarks Only available in `Client.requestLoop()`. */
declare const REQUEST_TIME: DOMHighResTimeStamp