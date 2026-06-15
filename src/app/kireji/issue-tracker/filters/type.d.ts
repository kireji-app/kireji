declare interface IKirejiIssueFilters
 extends IMix<IKirejiIssueTrackerApp, IPartAny>,
 IWebView {

 // Subparts
 readonly order: IKirejiIssueFiltersOrder
 readonly priority: IKirejiIssueFiltersPriority
 readonly status: IKirejiIssueFiltersStatus

 // Components.
 readonly apply(ISSUES: IKirejiIssueModal): IKirejiIssue[]
}

declare const KirejiIssueFilters: IKirejiIssueFilters
type KirejiIssueFilters = T
/** The incoming argument for the kireji issue filter `apply()` action. */
declare const ISSUES: IKirejiIssueModal