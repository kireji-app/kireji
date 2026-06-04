declare interface IKirejiApp
 extends IAppTLDApp,
 IWebView {

 // Subparts.
 readonly toolBar: IKirejiAppToolBar
 readonly sidebar: IKirejiAppSidebar
 readonly editor: IKirejiAppEditor
 readonly issueTracker: IKirejiIssueTrackerApp
}

declare const KirejiApp: IKirejiApp
type KirejiApp = T