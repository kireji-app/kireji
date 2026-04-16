declare interface IKirejiIssueFilters
 extends IMix<IKirejiIssueTrackerApp, IPartAny>,
 IWebComponent {

 // Subparts
 readonly dropdown: IKirejiIssueFiltersDropdown
 readonly order: IKirejiIssueFiltersOrder
 readonly priority: IKirejiIssueFiltersPriority
 readonly status: IKirejiIssueFiltersStatus

 // Serialized Properties.
 readonly apply(ISSUES: IKirejiIssues): IKirejiIssue[]
}

declare const kirejiIssueFilters: IKirejiIssueFilters
/** The incoming argument for the kireji issue filter `apply()` method. */
declare const ISSUES: IKirejiIssues