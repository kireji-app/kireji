declare interface IKirejiIssueFiltersPriority
 extends IMix<IKirejiIssueFilters, IBoolean<IKirejiIssueFiltersPriority>>,
 IWebComponent {

 // Subparts
 readonly a: IBoolean<IKirejiIssueFiltersPriority>
 readonly b: IBoolean<IKirejiIssueFiltersPriority>
 readonly c: IBoolean<IKirejiIssueFiltersPriority>
}

declare const kirejiIssueFiltersPriority: IKirejiIssueFiltersPriority