declare interface ITaskBar
 extends IMix<IDesktop, ITaskbarPart>,
 IWebComponent {

 // Subparts.
 readonly tray: ITray
 readonly menu: IMenu

 // Runtime Properties.
 readonly element: HTMLElement
}

declare type ITaskbarPart = IPart<ITaskBar, IPartAny>

declare const taskBar: ITaskBar