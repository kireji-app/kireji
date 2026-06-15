declare interface IParts
 extends IMix<IPartsApp, IAppAny> {

 // Subparts.
 readonly abstract: IAbstract
 readonly core: ICore
 readonly desktop: IDesktop
}

declare type IPartsApp =
 IApp<IParts, IPart<IPartsApp, IPartAny>>