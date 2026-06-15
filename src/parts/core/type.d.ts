/** The core parts that power all apps in the **Kireji Web Framework**. */
declare interface ICore
 extends IPartExplorer<IParts, IPartAny> {

 // Subparts.
 readonly addressBar: IAddressBar
 readonly agent: IAgent
 readonly client: IClient
 readonly graphics: IGraphics
 readonly hotKeys: IHotKeys
 readonly server: IServer
 readonly offlineServer: IOfflineServer
 readonly color?: IColor
 readonly era?: IEra
 readonly taskBar?: ITaskBar
 readonly windows?: IDesktopWindows
}

declare const Core: ICore
type Core = T