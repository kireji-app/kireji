declare interface IKirejiAppSidebar
 extends IMix<IKirejiApp, IKirejiAppSidebarPart>,
 IWebView {

 // Subparts.
 readonly open: IKirejiAppSidebarOpen
 readonly outlinerDomains: IPartOutliner<IKirejiAppSidebar>
 readonly outlinerTypes: IPartOutliner<IKirejiAppSidebar>
 readonly width: IKirejiAppSidebarWidth

 // Components.
 readonly "header.html": string
 readonly "view.html": string
 /** The part outliner currently assigned to the sidebar (resolves to a view even when the sidebar is hidden). */
 readonly "view": IPartOutliner<IKirejiAppSidebar>
 /** Opens any closed parent folders of and scrolls (if necessary) to the element corresponding to the currently active tab. Does nothing if the sidebar is closed or there are no tabs open. @remarks Client-only */
 readonly frameActiveTab(): void

 // Properties.
 readonly element: HTMLElement
}

declare type IKirejiAppSidebarPart =
 IPart<IKirejiAppSidebar, IPart<IKirejiAppSidebarPart, IPartAny>>

declare const KirejiSidebar: IKirejiAppSidebar
type KirejiSidebar = T
declare const SUBJECT: IPartAny