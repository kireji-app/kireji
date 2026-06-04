declare interface IKirejiIssueFilters
 extends IMix<IKirejiIssueTrackerApp, IPartAny>,
 IWebView {

 // Subparts
 readonly dropdown: IKirejiIssueFiltersDropdown
 readonly order: IKirejiIssueFiltersOrder
 readonly priority: IKirejiIssueFiltersPriority
 readonly status: IKirejiIssueFiltersStatus

 // Components.
 readonly apply(ISSUES: IKirejiIssues): IKirejiIssue[]
}

declare const KirejiIssueFilters: IKirejiIssueFilters
type KirejiIssueFilters = T
/** The incoming argument for the kireji issue filter `apply()` action. */
declare const ISSUES: IKirejiIssues