declare interface IDesktopWindows
 extends IPermutation<IDesktop, IDesktopWindow, IDesktopWindowModel, IAppAny>,
 IWebView {

 // Components.
 readonly renderTaskHTML(INSTANCE: IDesktopWindow, INSTANCE_INDEX: number): string

}

declare interface IDesktopWindow {
 readonly app: IPartAny
 readonly top: number
 readonly left: number
 readonly width: number
 readonly height: number
}

declare interface IDesktopWindowModel {
 readonly host: string
 readonly top: number
 readonly left: number
 readonly width: number
 readonly height: number
}

/** The host of the part to render. @remarks Only in `renderTaskHTML` actions. */
declare const TASK_HOST: string
declare const INSTANCES: IDesktopWindow[]
declare const INSTANCE: IDesktopWindow
declare const Windows: IDesktopWindows
type Windows = T