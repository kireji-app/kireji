declare interface IEra
 extends IMatch<IDesktop, IBodyMode<IEra>>,
 IWebComponent {

 // Subparts.
 readonly vintage: IBodyMode<IEra>
 readonly modern: IBodyMode<IEra>
}

/** A toggle between a Windows 98-inspired look-and-feel and a modern web app style. */
declare const era: IEra