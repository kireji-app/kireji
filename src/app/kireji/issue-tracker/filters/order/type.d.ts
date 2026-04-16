declare interface IKirejiIssueFiltersOrder
 extends IMix<IKirejiIssueFilters, IPartAny>,
 IWebComponent {

 // Subparts
 readonly by: IKirejiIssueFiltersOrderBy
 readonly descending: IBoolean<IKirejiIssueFiltersOrder>
}

declare const kirejiIssueFiltersOrder: IKirejiIssueFiltersOrder