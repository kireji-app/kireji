declare interface IPartExplorer<TOwner, TFactor>
 extends IApp<TOwner, IPartAny> {

 // Subparts.
 readonly partScroller: IScroller<IPartExplorer<Towner, TFactor>>

 // Components.
 readonly subjects: IPartAny[]
}

declare type IPartExplorerAny =
 IPartExplorer<IPartAny, IPartAny>

declare const thisPartExplorer: IPartExplorerAny