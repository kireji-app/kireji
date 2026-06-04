declare interface IAppSections<TOwner, TSection>
 extends IMatch<TOwner, TSection>,
 IAppDetails { }

declare type IAppSectionsAny =
 IAppSections<IAppAny, IAppSubsection<IAppSectionsAny>>

declare interface IAppSubsection<TAppSections>
 extends IMatch<TAppSections, IPart<IAppSubsection<TAppSections>, IPartAny>>,
 IAppDetails { }

declare const thisSections: IAppSectionsAny