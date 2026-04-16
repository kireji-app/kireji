declare interface IKirejiIssueFiltersDropdown
 extends IMatch<IKirejiIssueFilters, IPartAny>,
 IWebComponent {

 // Subparts
 readonly none: IPart<IKirejiIssueFiltersDropdown, null>
 readonly order: IPart<IKirejiIssueFiltersDropdown, null>
 readonly priority: IPart<IKirejiIssueFiltersDropdown, null>
 readonly status: IPart<IKirejiIssueFiltersDropdown, null>
}

declare const kirejiIssueFiltersDropdown: IKirejiIssueFiltersDropdown