declare interface IKirejiIssueFiltersStatus
 extends IMix<IKirejiIssueFilters, IPartAny>,
 IWebView {

 // Subparts
 readonly a: IBoolean<IKirejiIssueFiltersPriority>
 readonly b: IBoolean<IKirejiIssueFiltersPriority>
 readonly c: IBoolean<IKirejiIssueFiltersPriority>
}

declare const KirejiIssueFiltersStatus: IKirejiIssueFiltersStatus
type KirejiIssueFiltersStatus = T