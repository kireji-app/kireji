declare interface IAppTLD
 extends ITopLevelDomain<IAppTLDApp> {

 // Subparts.
 readonly kireji: IKirejiApp
}

declare type IAppTLDApp =
 IApp<IApp, IPart<IAppTLDApp, IPartAny>>