declare interface IKirejiIssueModal
 extends IAppSections<IKirejiIssueTrackerApp, IKirejiIssue> {

 // Properties.
 /** Whether or not the issue modal CSS has been injected into the page. */
 readonly initialized: boolean
}

declare const KirejiIssueModal: IKirejiIssueModal
type KirejiIssueModal = T