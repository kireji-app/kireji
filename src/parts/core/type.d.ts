/** The core parts that power all apps in the **Kireji Web Framework**. */
declare interface ICore
 extends IApp<IParts, IFacet<ICore>> {

 // Subparts.
 readonly addressBar: IAddressBar
 readonly agent: IAgent
 readonly client: IClient
 readonly gpu: IGPU
 readonly hotKeys: IHotKeys
 readonly server: IServer
 readonly update: IUpdateManager
 readonly offlineServer: IOfflineServer
}

declare const Core: ICore
type Core = T