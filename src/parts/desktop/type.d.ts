declare interface IDesktop
 extends IPartsApp {

 // Subparts.
 readonly about: AboutApp
 readonly icons?: IDesktopIcons
}

declare const Desktop: IDesktop
type Desktop = T