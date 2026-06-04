declare interface IKirejiAppToolBar
 extends IMatch<IKirejiApp, IKirejiAppToolBarItem>,
 IWebView {

 // Subparts.
 readonly hidden: IKirejiAppToolBarItem
 readonly outlinerDomains: IKirejiAppToolBarItem
 readonly outlinerTypes: IKirejiAppToolBarItem
}

declare interface IKirejiAppToolBarItem
 extends IPart<IKirejiAppToolBar, null>,
 IWebView { }

declare const KirejiToolBar: IKirejiAppToolBar
type KirejiToolBar = T