declare interface IOutliner<TOwner, TSubject>
 extends IMix<TOwner, IOutlinerPart<TOwner>>,
 IWebView {

 // Subparts.
 readonly scroller: IScroller<IOutliner<TOwner>>
 readonly folderMask: IOutlinerFolderMask<IOutliner<TOwner>>

 // Components.
 /** A required ID to apply to the outliner's HTML element needed to distinguish it from other on-screen outliners. */
 readonly "id": string
 /** Takes in a node and recursively generates its outliner item HTML. */
 readonly recursiveItemHTML(BITMASK_NODE: IBitmaskNode<TSubject>, DEPTH: number, IS_LAST_OF_TYPE: bool): string
 /** Responds to a click on the collapse/expand button of the given svg element, updating the button's state and the outliner's RID using the given index to set the bit in the the outliner's RID that represents the given outliner item. */
 readonly togglePoint(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement, BITMASK_NODE_INDEX: number): void
}

declare type IOutlinerAny =
 IOutliner<IPart<IOutlinerAny, IOutlinerPart<IOutlinerAny, any>>, any>

declare type IOutlinerPart<TOutlinerOwner, TSubject> =
 IPart<IOutliner<TOutlinerOwner, TSubject>, IPart<IOutlinerPart<TOutlinerOwner, TSubject>, TSubject>>

declare const thisOutliner: IOutlinerAny