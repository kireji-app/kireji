declare interface IKirejiIssueTrackerApp
 extends IApplication<IKirejiApp, IPartAny> {

 // Subparts.
 readonly scroller: IScroller<IKirejiIssueTrackerApp>
 readonly sections: IKirejiIssueSections
 readonly filters: IKirejiIssueFilters

 // Serialized Properties.
 readonly "issues.html": string
}

declare const kirejiIssueTracker: IKirejiIssueTrackerApp