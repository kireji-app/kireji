declare interface IKirejiApp
 extends IAppApplication {

 // Subparts.
 readonly toolBar: IKirejiAppToolBar
 readonly sidebar: IKirejiAppSidebar
 readonly editor: IKirejiAppEditor
 readonly issueTracker: IKirejiIssueTrackerApp
}

declare const kirejiApp: IKirejiApp