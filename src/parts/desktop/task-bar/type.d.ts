declare interface ITaskBar
 extends IMix<IDesktop, ITaskbarPart>,
 IWebView {

 // Subparts.
 readonly tray: ITray
 readonly menu: IMenu

 // Properties.
 readonly element: HTMLElement
}

declare type ITaskbarPart = IPart<ITaskBar, IPartAny>

declare const TaskBar: ITaskBar
type TaskBar = T