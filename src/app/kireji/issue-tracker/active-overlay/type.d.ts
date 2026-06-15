declare interface IKirejiIssuesActiveOverlay
 extends IMatch<IKirejiIssueTrackerApp, IPartAny>,
 IAppDetails {

 // Subparts.
 readonly commandPalette: IKirejiIssueCommandPalette
 readonly filterDropdown: IKirejiIssueFilterDropdown
 readonly issueModal: IKirejiIssueModal
 readonly priorityDropdown: IKirejiIssueFilterDropdown
 readonly statusDropdown: IKirejiIssueFilterDropdown
}

declare const KirejiIssuesActiveOverlay: IKirejiIssuesActiveOverlay
type KirejiIssuesActiveOverlay = T