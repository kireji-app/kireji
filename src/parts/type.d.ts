declare interface IParts
 extends ITopLevelDomain<IPartsApp> {

 // Subparts.
 readonly abstract: IAbstract
 readonly core: ICore
 readonly desktop: IDesktop
 readonly user: IUser
}

declare type IPartsApp =
 IApp<IParts, IPart<IPartsApp, IPartAny>>