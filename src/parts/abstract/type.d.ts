declare interface IAbstract
 extends IPartExplorer<IParts, IPartAny> {

 // Subparts.
 readonly app: IApp<IAbstract, null>
 readonly bodyMode: IBodyMode<IAbstract>
 readonly boolean: IBoolean<IAbstract>
 readonly clip: IClip<IAbstract, null>
 readonly comingSoon: IComingSoonApp<IAbstract>
 readonly error: IErrorApp<IAbstract>
 readonly facet: IFacet<IAbstract, null>
 readonly issue: ITrackedIssue<IAbstract>
 readonly match: IMatch<IAbstract, null>
 readonly walkable: IWalkable<IAbstract>
 readonly mix: IMix<IAbstract, null>
 readonly part: IPart<IAbstract, null>
 readonly bitmask: IBitmask<IAbstract, null>
 readonly outliner: IOutliner<IAbstract, null>
 readonly permutation: IPermutation<IAbstract, null, null, null>
 readonly scroller: IScroller<IAbstract, null>
 readonly sections: IAppSections<IAbstract, null>
}

declare const Abstract: IAbstract
type Abstract = T