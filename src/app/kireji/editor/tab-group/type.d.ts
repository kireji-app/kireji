declare interface IKirejiAppTabGroup
 extends IPart<IKirejiApp, null>,
 IWebComponent {

 // Serialized Properties.
 /** The currently active tab, equal to `tabGroup.openTabs[tabGroup.activeTabIndex]` */
 readonly "activeTab": IKirejiAppTabGroupTab
 /** The current preview tab, equal to `tabGroup.openTabs[tabGroup.previewTabIndex]` */
 readonly "previewTab": IKirejiAppTabGroupTab
 /** The part corresponding to the active tab, equal to `tabGroup.openTabs[tabGroup.activeTabIndex].part` */
 readonly "activePart": IPartAny
 /** Returns the specific permutation ID of the given array of tab models without changing the state of the tab group. */
 readonly getPermutationRouteID(TABS: IKirejiAppTabGroupTabArray): bigint
 /** Returns the specific payload ID of the given array of tab models without changing the state of the tab group. */
 readonly getPayloadRouteID(TABS: IKirejiAppTabGroupTabArray): bigint
 /** Sets the tab group route ID based on the current distributed model data by adding and multiplying cached component properties, recomputing them if RECOMPUTE_OPEN_TABS is true. If the active tab has changed, it resets the editor scroller and frames the new active item in any open sidebar. */
 readonly recomputeRouteID(RECOMPUTE_OPEN_TABS: boolean = false): bigint
 /** Updates the state fields for the currently active part part, if it is a summary view. */
 readonly listener(SENDER: IPartAny): void
 /** Attaches to events for the active part so that changes to the part's state triggers changes to the summary page. */
 readonly attachListeners(): void
 /** Detaches from listeners to prevent the edge case wherein departing from the summary of a part belonging to the kireji app triggers changes to that summary page _after_ departing from it. */
 readonly detachListeners(): void

 // Runtime Properties.
 readonly tabOffsets: bigint[]
 readonly tabBitDepths: bigint[]
 readonly permutationSizes: bigint[]
 readonly payloadCardinality: bigint
 readonly payloadSizes: bigint[]
 /** The tab group's main HTML element. @remarks Client-only */
 readonly container: HTMLElement
 /** The most recent tab model, as determined while populating the view (not when propagating the route ID). @remarks Client-only */
 readonly viewedActiveTab?: IKirejiAppTabGroupTab
 /** The most recent preview tab model, as determined while populating the view (not when propagating the route ID). @remarks Client-only */
 readonly viewedPreviewTab?: IKirejiAppTabGroupTab
 /** The most recent permutation route ID, used to quickly determine if the tab arrangement has changed since the last view population. */
 readonly viewedPermutationRouteID?: bigint
 /** The most recent payload route ID, used to quickly determine if any payload data has changed since the last view population. */
 readonly viewedPayloadRouteID?: bigint
 /** The set of viewed tab objects corresponding to the current `tabGroup.viewedPermutationRouteID`. */
 readonly viewedOpenTabs: IKirejiAppTabGroupTabArray
 /** A subindex representing which permutation of k open tabs is assigned. */
 readonly permutationRouteID: bigint
 /** A subindex representing the combined per-tab payload data for the k open tabs. */
 readonly payloadRouteID: bigint
 /** A Fenwick tree that allows performant ranking and unranking of permutation indices. */
 readonly tree: FenwickTree
 readonly openTabs: IKirejiAppTabGroupTabArray
 /** The index of the currently active tab. */
 readonly activeTabIndex: number
 /** The index of the preview tab, if one exists. The preview tab is the tab which can be replaced when opening a new tab. */
 readonly previewTabIndex?: number
 /** The maximum number of tabs that the user can have open, used to mitigate the potentially massive state space of this component. */
 readonly maxTabCount: bigint
}

declare type IKirejiAppTabGroupTabArray = IKirejiAppTabGroupTab[]

declare interface IKirejiAppTabGroupTab {
 readonly part: IPartAny
 readonly filename?: string
 readonly payload: bigint
}

declare const tabGroup: IKirejiAppTabGroup
/** The index of the tab to render. @remarks Only in `close`, `point` and `renderTabHTML` methods. */
declare const TAB_INDEX: number
/** The host part of the given tab. @remarks Only in `renderTabHTML` method. */
declare const TAB_PART: IPartAny
/** The filename of the given tab. @remarks Only in `renderTabHTML` method. */
declare const TAB_FILENAME: string
declare const activeTab: IKirejiAppTabGroupTab
declare const activePart: IPartAny
declare const TABS: IKirejiAppTabGroupTabArray