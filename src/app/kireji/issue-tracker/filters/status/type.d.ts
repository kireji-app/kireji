declare interface IKirejiIssueFiltersStatus
 extends IMix<IKirejiIssueFilters, IPartAny>,
 IWebComponent {

 // Subparts
 readonly a: IBoolean<IKirejiIssueFiltersPriority>
 readonly b: IBoolean<IKirejiIssueFiltersPriority>
 readonly c: IBoolean<IKirejiIssueFiltersPriority>
}

declare const kirejiIssueFiltersStatus: IKirejiIssueFiltersStatus