declare interface IAppTLD
 extends IMix<IEcosystem, IAppTLDApp> {

 // Subparts.
 readonly kireji: IKirejiApp
}

declare type IAppTLDApp =
 IApp<IApp, IPart<IAppTLDApp, IPartAny>>