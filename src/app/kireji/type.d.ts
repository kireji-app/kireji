declare interface IKirejiApp
 extends IAppTLDApp,
 IWebView {

 // Subparts.
 readonly toolBar: IKirejiAppToolBar
 readonly sidebar: IKirejiAppSidebar
 readonly editor: IKirejiAppEditor
 readonly issueTracker: IKirejiIssueTrackerApp

 // Components.
 readonly renderComponentHTML(COMPONENT_OWNER: IPartAny, COMPONENT_KEY: string): string
}

declare const KirejiApp: IKirejiApp
type KirejiApp = T
declare const COMPONENT_OWNER: IPartAny