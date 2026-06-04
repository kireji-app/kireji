declare interface IKirejiIssuesSections
 extends IAppSections<IKirejiIssueTrackerApp, IPartAny> {

 // Subparts.
 readonly issues: IKirejiIssues
 readonly summary: IKirejiIssueSummary
}

declare const KirejiIssuesSections: IKirejiIssuesSections
type KirejiIssuesSections = T