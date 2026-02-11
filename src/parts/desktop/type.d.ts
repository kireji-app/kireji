declare interface IDesktop
 extends IPartsApplication {

 // Subparts.
 readonly color: IColor
 readonly era: IEra
 readonly taskBar: ITaskBar
 readonly icons: IDesktopIcons
 readonly windows: IDesktopWindows
}

declare const desktop: IDesktop