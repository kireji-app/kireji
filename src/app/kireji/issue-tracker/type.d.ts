declare interface IKirejiIssueTrackerApp
 extends IApp<IKirejiApp, IPartAny> {

 // Subparts.
 readonly scroller: IScroller<IKirejiIssueTrackerApp>
 readonly activeOverlay: IKirejiIssuesActiveOverlay
 readonly filters: IKirejiIssueFilters

 // Components.
 readonly "issues.html": string
}

declare const KirejiIssueTracker: IKirejiIssueTrackerApp
type KirejiIssueTracker = T