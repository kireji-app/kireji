declare interface IKirejiIssueSections
 extends IApplicationSections<IKirejiIssueTrackerApp, IPartAny> {

 // Subparts.
 readonly issues: IKirejiIssues
 readonly summary: IKirejiIssueSummary
}

declare const kirejiIssueSections: IKirejiIssueSections