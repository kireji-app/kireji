declare interface IKirejiIssueFiltersOrderBy
 extends IMatch<IKirejiIssueFilters, IPartAny> {

 // Subparts
 readonly date: IPart<IKirejiIssueFiltersOrderBy, null>
 readonly priority: IPart<IKirejiIssueFiltersOrderBy, null>
 readonly status: IPart<IKirejiIssueFiltersOrderBy, null>
 readonly title: IPart<IKirejiIssueFiltersOrderBy, null>
}

declare const kirejiIssueFiltersOrderBy: IKirejiIssueFiltersOrderBy