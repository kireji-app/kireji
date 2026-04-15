declare interface IKirejiIssueTrackerApp
 extends IApplication<IKirejiApp, IPartAny> {

 // Subparts.
 readonly scroller: IScroller<IKirejiIssueTrackerApp>
 readonly sections: IKirejiIssueSections
 readonly filters: IKirejiIssueFilters
}

declare const kirejiIssueTracker: IKirejiIssueTrackerApp