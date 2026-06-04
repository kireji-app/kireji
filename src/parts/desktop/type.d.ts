declare interface IDesktop
 extends IPartsApp {

 // Subparts.
 readonly color?: IColor
 readonly era?: IEra
 readonly taskBar?: ITaskBar
 readonly icons?: IDesktopIcons
 readonly windows?: IDesktopWindows
}

declare const Desktop: IDesktop
type Desktop = T