declare interface IKirejiIssueFiltersPriority
 extends IMix<IKirejiIssueFilters, IBoolean<IKirejiIssueFiltersPriority>>,
 IWebView {

 // Subparts
 readonly a: IBoolean<IKirejiIssueFiltersPriority>
 readonly b: IBoolean<IKirejiIssueFiltersPriority>
 readonly c: IBoolean<IKirejiIssueFiltersPriority>
}

declare const KirejiIssueFiltersPriority: IKirejiIssueFiltersPriority
type KirejiIssueFiltersPriority = T