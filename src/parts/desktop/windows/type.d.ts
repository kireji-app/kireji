declare interface IDesktopWindows
 extends IPermutation<IDesktop, IDesktopWindow, IDesktopWindowModel, IApplicationAny>,
 IWebComponent {

 // Serialized Properties.
 readonly renderTabHTML(INSTANCE: IDesktopWindow, INSTANCE_INDEX: number): string

}

declare interface IDesktopWindow {
 readonly application: IApplicationAny
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

/** The host of the application to render.
 * 
 * *Only available in `renderTaskHTML` methods.* */
declare const APPLICATION_HOST: string
declare const INSTANCES: IDesktopWindow[]
declare const INSTANCE: IDesktopWindow
declare const windows: IDesktopWindows