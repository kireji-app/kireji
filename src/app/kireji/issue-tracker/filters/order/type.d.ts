declare interface IKirejiIssueFiltersOrder
 extends IMix<IKirejiIssueFilters, IPartAny>,
 IWebView {

 // Subparts
 readonly by: IKirejiIssueFiltersOrderBy
 readonly descending: IBoolean<IKirejiIssueFiltersOrder>
}

declare const KirejiIssueFiltersOrder: IKirejiIssueFiltersOrder
type KirejiIssueFiltersOrder = T