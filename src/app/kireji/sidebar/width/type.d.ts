declare interface IKirejiAppSidebarWidth
 extends IPart<IKirejiAppSidebar, null>,
 IWebView {

 // Components.
 /** A string which is used as the style string for the app's container element, allowing rapid updating. */
 readonly "style": string
 /** The event handler for clicking and dragging to resize the sidebar. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void

 // Properties.
 /** The smallest width the sidebar panel is allowed to reach while open. Half of this number is the threshold at which a user dragging the panel will see it close. */
 readonly min: number
}

declare interface IKirejiAppSidebarWidthPointerConfig
 extends IPointerConfig {
 /** The width in pixels of the toolbar element. Used to determine the true width of the sidebar panel using pointer event positions. */
 readonly toolBarWidth: number
 /** A cache of the RID of the sidebar width at the beginning of the pointer session. This allows the RID to drive the visible drag behavior while also allowing the user to drag the panel closed so that it reopens to its original width before the drag session started. */
 readonly sidebarWidthRIDCache: bigint
}

declare const KirejiSidebarWidth: IKirejiAppSidebarWidth
type KirejiSidebarWidth = T