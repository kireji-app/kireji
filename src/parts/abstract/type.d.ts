declare interface IAbstract
 extends IErrorApplication<IParts> {

 // Subparts.
 readonly application: IApplication<IAbstract, null>
 readonly bodyMode: IBodyMode<IAbstract>
 readonly boolean: IBoolean<IAbstract>
 readonly clip: IClip<IAbstract, null>
 readonly comingSoon: IComingSoonApplication<IAbstract>
 readonly error: IErrorApplication<IAbstract>
 readonly facet: IFacet<IAbstract, null>
 readonly issue: ITrackedIssue<IAbstract>
 readonly match: IMatch<IAbstract, null>
 readonly mesh: IMesh<IAbstract>
 readonly mix: IMix<IAbstract, null>
 readonly part: IPart<IAbstract, null>
 readonly partMask: IPartMask<IAbstract, null>
 readonly partOutliner: IPartOutliner<IAbstract>
 readonly permutation: IPermutation<IAbstract, null, null, null>
 readonly scroller: IScroller<IAbstract, null>
 readonly sections: IApplicationSections<IAbstract, null>
 readonly tld: ITopLevelDomain<IAbstract, null>
}